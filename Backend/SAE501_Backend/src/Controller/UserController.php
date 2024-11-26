<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Security\Core\User\UserInterface;
use App\Entity\User;

class UserController extends AbstractController
{
    #[Route('/user/get', name: 'list_users', methods: ['GET'])]
    public function listUsers(UserRepository $userRepository, EntityManagerInterface $em): Response
    {
        // $this->denyAccessUnlessGranted('ROLE_ADMIN');
        // $users = $userRepository->findAll();
        // return $this->json($users);
        $users = $em->getRepository(User::class)->findAll();
        if ($users) {
            $data = array_map(function ($category) {
                return [
                    'id' => $category->getId(),
                    'name' => $category->getName(),
                ];
            }, $users);
            return $this->json($data, Response::HTTP_OK);
        } else {
            return $this->json(['message' => 'Pas de categories trouvées'], Response::HTTP_OK);
        }
    }

    #[Route('/user/{id}/get', name: 'view_profile', methods: ['GET'])]
    public function viewProfile(): Response
    {
        $user = $this->getUser();
        return $this->json($user);
    }

    #[Route('/user/{id}/put', name: 'edit_profile', methods: ['PUT'])]
    public function editProfile(Request $request, EntityManagerInterface $em, UserInterface $user): Response {
        $data = json_decode($request->getContent(), true);
        $user = new User();
        if (isset($data['nom'])) {
            $user->setName($data['name']);
        }
        if (isset($data['email'])) {
            $user->setEmail($data['email']);
        }
        $em->persist($user);
        $em->flush();
        return $this->json(['message' => 'Profil mis à jour avec succès']);
    }

    #[Route('/user/post', name: 'create_user', methods: ['POST'])]
    public function createUser(Request $request, EntityManagerInterface $em): Response {
        $data = json_decode($request->getContent(), true);
        $user = new User();

        $user->setName($data['name']);
        $user->setEmail($data['email']);
        $user->setPassword($data['password']);
        $user->setRoles(['ROLES_USER']);

        $em->persist($user);
        $em->flush();
        return $this->json(['message' => 'Utilisateur créé avec succès']);
    }
}
