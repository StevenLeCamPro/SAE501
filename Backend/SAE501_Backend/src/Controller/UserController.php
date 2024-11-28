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
    public function viewProfile(Request $request, EntityManagerInterface $em, $id): Response
    {
        // $user = $this->getUser();
        // return $this->json($user);

        $users = $em->getRepository(User::class)->find($id);
        if ($users) {
            $data = [
                'id' => $users->getId(),
                'name' => $users->getName(),
                'email' => $users->getEmail(),
                'password' => $users->getPassword()
            ];
            return $this->json([$data], Response::HTTP_OK);
        } else {
            return $this->json(['message' => 'Pas de categorie trouvée'], Response::HTTP_OK);
        }
    }

    #[Route('/user/{id}/put', name: 'edit_profile', methods: ['PUT'])]
    public function editProfile(Request $request, EntityManagerInterface $em, $id): Response {
    

        $users = $em->getRepository(User::class)->find($id);

        if ($users) {
            $data = json_decode($request->getContent(), true);

            if (isset($data['name'])) {
                $users->setName($data['name']);
            } else {
                return $this->json(['message' => 'Le champ "name" est requis'], Response::HTTP_BAD_REQUEST);
            }

            if (isset($data['firstName'])) {
                $users->setFirstName($data['firstName']);
            } else {
                return $this->json(['message' => 'Le champ "firstName" est requis'], Response::HTTP_BAD_REQUEST);
            }

            if (isset($data['email'])) {
                $users->setEmail($data['email']);
            } else {
                return $this->json(['message' => 'Le champ "email" est requis'], Response::HTTP_BAD_REQUEST);
            }

            if (!isset($data['confirmPassword'])) {
                return $this->json(['message' => 'Le champs confirmation de mot de passe est obligatoire'], Response::HTTP_BAD_REQUEST);
            }

            if (isset($data['password'])) {
                $users->setPassword($data['password']);
            } else {
                return $this->json(['message' => 'Le champ "password" est requis'], Response::HTTP_BAD_REQUEST);
            }

            if ($data['password'] != $data['confirmPassword']) {
                return $this->json(['message' => 'Le mot de passe est la confirmation de mot de passe ne correspondent pas'], Response::HTTP_BAD_REQUEST);
            }

            if (isset($data['phone'])) {
                $users->setPhone($data['phone']);
            } else {
                return $this->json(['message' => 'Le champ "phone" est requis'], Response::HTTP_BAD_REQUEST);
            }
            
            $em->persist($users);
            $em->flush();

            return $this->json(['message' => 'user mise à jour avec succès'], Response::HTTP_OK);
        }

        return $this->json(['message' => 'Pas de user trouvée'], Response::HTTP_NOT_FOUND);
    }

    #[Route('/user/post', name: 'create_user', methods: ['POST'])]
    public function createUser(Request $request, EntityManagerInterface $em): Response {
        $data = json_decode($request->getContent(), true);

        if ($data['password'] != $data['confirmPassword']) {
            return $this->json(['message' => 'Le mot de passe est la confirmation de mot de passe ne correspondent pas'], Response::HTTP_BAD_REQUEST);
        }else{
        $user = new User();

        $user->setName($data['name']);
        $user->setFirstName($data['firstName']);
        $user->setBirthDate(new \DateTime($data['birthDate']));
        $user->setPhone($data['phone']);
        $user->setAddress($data['address']);
        $user->setEmail($data['email']);
        $currentDateTime = new \DateTimeImmutable('now');
        $currentDateTime->format('Y-m-d');
        $user->setCreatedAt($currentDateTime);
        $hashedPassword = password_hash($data['password'], PASSWORD_DEFAULT);
        $user->setPassword($hashedPassword);
        $user->setRoles(['ROLES_USER']);

        $em->persist($user);
        $em->flush();
        return $this->json(['message' => 'Utilisateur créé avec succès']);
    }
    }

    #[Route('/user/{id}/delete', name: 'delete_user_by_id', methods: ['DELETE'])]
    public function DeleteCategorieById(EntityManagerInterface $em, $id): Response
    {
        $user = $em->getRepository(User::class)->find($id);

        if ($user) {
            $em->remove($user);
            $em->flush();

            return $this->json(['message' => 'Categorie supprimée avec succès'], Response::HTTP_OK);
        }

        return $this->json(['message' => 'Pas de categorie trouvée'], Response::HTTP_NOT_FOUND);
    }
}
