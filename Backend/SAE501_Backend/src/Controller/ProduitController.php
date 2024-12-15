<?php

namespace App\Controller;

use App\Entity\Categorie;
use App\Entity\Produit;
use App\Entity\Image;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

class ProduitController extends AbstractController
{
    #[Route('/produit/post', name: 'create_produit', methods: ['POST'])]
    public function CreateProduit(Request $request, EntityManagerInterface $em): Response
    {
        $data = json_decode($request->getContent(), true);
        $produit = new Produit();

        $produit->setNom($data['nom']);
        $produit->setDescription($data['description']);
        $produit->setPrix($data['prix']);

        foreach ($data['categorie'] as $categorieId) {
            $category = $em->getRepository(Categorie::class)->find($categorieId);
            if ($category) {
                $produit->getCategorie()->add($category);
            }
        }

        if ($data['imageId']) {
            $image = $em->getRepository(Image::class)->find($data['imageId']);
            if ($image) {
                $produit->setImage($image);
            }
        }

        $em->persist($produit);
        $em->flush();
        return $this->json(['message' => 'Produit créé avec succès'], Response::HTTP_CREATED);
    }

    #[Route('/produit/get', name: 'get_produits', methods: ['GET'])]
    public function GetProduit(Request $request, EntityManagerInterface $em): Response
    {
        $produits = $em->getRepository(Produit::class)->findAll();
        if ($produits) {
            $data = array_map(function ($produit) {
                if ($produit->getImage()) {
                    $image = $produit->getImage();
                    $imageId = $image->getId();
                    $path = $image->getPath();
                } else {
                    $imageId = null;
                    $path = null;
                }
                return [
                    'id' => $produit->getId(),
                    'nom' => $produit->getNom(),
                    'description' => $produit->getDescription(),
                    'image' => $path,
                    'imageId' => $imageId,
                    'prix' => $produit->getPrix(),
                    'categorie' => $produit->getCategorie()->map(fn(Categorie $categorie) => $categorie->getId())->toArray()
                ];
            }, $produits);
            return $this->json($data, Response::HTTP_OK);
        } else {
            return $this->json(['message' => 'Pas de produits trouvés'], Response::HTTP_OK);
        }
    }

    #[Route('/produit/{id}/get', name: 'get_produit_by_id', methods: ['GET'])]
    public function GetProduitById(Request $request, EntityManagerInterface $em, $id): Response
    {
        $produits = $em->getRepository(Produit::class)->find($id);
        if ($produits) {

            if ($produits->getImage()) {
                $image = $produits->getImage();
                $imageId = $image->getId();
                $path = $image->getPath();
            } else {
                $imageId = null;
                $path = null;
            }

            $data = [
                'id' => $produits->getId(),
                'nom' => $produits->getNom(),
                'description' => $produits->getDescription(),
                'image' => $path,
                'imageId' => $imageId,
                'prix' => $produits->getPrix(),
                'categorie' => $produits->getCategorie()->map(fn(Categorie $categorie) => $categorie->getId())->toArray()
            ];

            return $this->json([$data], Response::HTTP_OK);
        } else {
            return $this->json(['message' => 'Pas de produits trouvés'], Response::HTTP_OK);
        }
    }

    #[Route('/produit/{id}/put', name: 'put_produit_by_id', methods: ['PUT'])]
    public function PutProduitById(Request $request, EntityManagerInterface $em, $id): Response
    {
        $produit = $em->getRepository(Produit::class)->find($id);

        if ($produit) {
            $data = json_decode($request->getContent(), true);

            if (isset($data['nom'])) {
                $produit->setNom($data['nom']);
            } else {
                return $this->json(['message' => 'Le champ "nom" est requis'], Response::HTTP_BAD_REQUEST);
            }

            if (isset($data['description'])) {
                $produit->setDescription($data['description']);
            } else {
                return $this->json(['message' => 'Le champ "description" est requis'], Response::HTTP_BAD_REQUEST);
            }
            
            $produit->setPrix($data['prix']);

            foreach ($data['categorie'] as $categorieId) {
                $category = $em->getRepository(Categorie::class)->find($categorieId);
                if ($category) {
                    $produit->getCategorie()->add($category);
                }
            }
    
            if ($data['imageId']) {
                $image = $em->getRepository(Image::class)->find($data['imageId']);
                if ($image) {
                    $produit->setImage($image);
                }
            }

            $em->persist($produit);
            $em->flush();

            return $this->json(['message' => 'Produit mis à jour avec succès'], Response::HTTP_OK);
        }

        return $this->json(['message' => 'Pas de produit trouvé'], Response::HTTP_NOT_FOUND);
    }

    #[Route('/produit/{id}/delete', name: 'delete_categorie_by_id', methods: ['DELETE'])]
    public function DeleteProduitById(EntityManagerInterface $em, $id): Response
    {
        $categorie = $em->getRepository(Produit::class)->find($id);

        if ($categorie) {
            $em->remove($categorie);
            $em->flush();

            return $this->json(['message' => 'Produit supprimé avec succès'], Response::HTTP_OK);
        }

        return $this->json(['message' => 'Pas de produit trouvée'], Response::HTTP_NOT_FOUND);
    }
}
