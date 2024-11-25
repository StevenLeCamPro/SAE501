<?php

namespace App\Controller;
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
   public function register(Request $request, UserPasswordHasherInterface $passwordHasher, 
EntityManagerInterface $em): Response
   {
       $data = json_decode($request->getContent(), true);
       $user = new User();
       $user->setEmail($data['email']);
       $user->setName($data['nom']);
       $hashedPassword = $passwordHasher->hashPassword($user, $data['password']);
       $user->setPassword($hashedPassword);
       $user->setRoles(['ROLE_USER']);  // Par défaut, chaque utilisateur est un simple utilisateur
       $em->persist($user);
       $em->flush();
       return $this->json(['message' => 'Utilisateur créé avec succès'], 
Response::HTTP_CREATED);
   }


    #[Route('/login', name: 'login', methods: ['POST'])]
    public function login(): Response
    {
        $user = $this->getUser();
        if (!$user) {
            return $this->json(['message' => 'User not found'], Response::HTTP_UNAUTHORIZED);
        }
        return $this->json([
            'email' => $user->getEmail(),
            'roles' => $user->getRoles()
        ]);

    }
}
