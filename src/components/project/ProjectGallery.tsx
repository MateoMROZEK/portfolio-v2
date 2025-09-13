"use client";

import { useState } from "react";
import Image from "next/image";
import { Modal, ModalContent, ModalBody } from "@heroui/react";

type ProjectGalleryProps = {
  images: string[];
  projectName: string;
};

export default function ProjectGallery({ images, projectName }: ProjectGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <section>
      <h3 className="text-xl font-semibold text-mateo-primary mb-4">Gallery</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {images.map((img, idx) => (
          <div
            key={idx}
            onClick={() => setSelectedImage(img)}
            className="relative overflow-hidden rounded-2xl bg-mateo-secondary shadow-lg cursor-pointer group"
          >
            <Image
              src={img}
              alt={`${projectName} screenshot ${idx}`}
              width={1200}
              height={800}
              className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          </div>
        ))}
      </div>

      {/* Lightbox */}
      <Modal isOpen={!!selectedImage} onOpenChange={() => setSelectedImage(null)} size="5xl">
        <ModalContent>
          <ModalBody className="p-0">
            {selectedImage && (
              <Image
                src={selectedImage}
                alt={projectName}
                width={1920}
                height={1080}
                className="w-full h-auto rounded-lg"
              />
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </section>
  );
}
