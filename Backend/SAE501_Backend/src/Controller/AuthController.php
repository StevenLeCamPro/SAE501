<?php

namespace App\Controller;
use App\Entity\UserToken;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Routing\Annotation\Route;
use App\Entity\User;
class AuthController extends AbstractController
{
    #[Route('/register', name: 'register', methods: ['POST'])]
    public function register(
        Request $request,
        EntityManagerInterface $em
    ): Response {
        $data = json_decode($request->getContent(), true);
        $user = new User();
        $user->setEmail($data['email']);
        $user->setName($data['nom']);
        $hashedPassword = password_hash($data['password'], PASSWORD_DEFAULT);
        $user->setPassword($hashedPassword);
        $user->setRoles(1);
        $em->persist($user);
        $em->flush();
        return $this->json(
            ['message' => 'Utilisateur créé avec succès'],
            Response::HTTP_CREATED
        );
    }


    #[Route('/login', name: 'login', methods: ['POST'])]
    public function login(Request $request, EntityManagerInterface $em, UserPasswordHasherInterface $passwordHasher): Response
    {
        $data = json_decode($request->getContent(), true);
        $email = $data['email'] ?? '';
        $password = $data['password'] ?? '';

        $user = $em->getRepository(User::class)->findOneBy(['email' => $email]);

        if (!$user || !$passwordHasher->isPasswordValid($user, $password)) {
            return $this->json(['error' => 'Invalid credentials'], 401);
        }

        $token = bin2hex(random_bytes(32));
        $tokenDate = new \DateTimeImmutable();

        $userToken = new UserToken();
        $userToken->setUser($user);
        $userToken->setToken($token);
        $userToken->setCreatedAt($tokenDate);

        $em->persist($userToken);
        $em->flush();

        return $this->json([
            'user_id' => $user->getId(),
            'role' => $user->getRoles(),
            'date' => $tokenDate->format('Y-m-d H:i:s'),
            'token' => $token,
        ]);
    }
}
