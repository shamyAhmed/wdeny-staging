"use client";
import React from "react";
import { Button } from "antd";
import { FiChevronLeft } from "react-icons/fi";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface BlogCardProps {
  title: string;
  description: string;
  buttonText: string;
  backgroundImage: string;
}

export const BlogCard = ({
  title,
  description,
  buttonText,
  backgroundImage,
}: BlogCardProps) => {
  const router = useRouter();
  return (
    <div className="relative w-full h-[500px] rounded-3xl overflow-hidden group border border-white">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={backgroundImage}
          alt={title}
          fill
          className="object-cover"
          priority
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-red-900/50 to-red-600/90"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-end px-6 py-10">
        {/* Title */}
        <h2 className="text-xl md:text-2xl font-bold text-white mb-4 leading-tight">
          {title}
        </h2>

        {/* Description */}
        <p className="text-white/90 text-base md:text-lg mb-8 max-w-2xl leading-relaxed">
          {description}
        </p>

        <div className="flex justify-end">
          <Button
            type="default"
            size="large"
            onClick={() => router.push("/blogs/1")}
            className="!bg-white/10 backdrop-blur-lg !border-2 !border-white !text-white hover:!bg-white hover:!text-red-600 !h-14 !px-8 !rounded-xl !text-lg transition-all duration-300 flex items-center gap-2"
          >
            {buttonText}
            <FiChevronLeft className="text-xl" />
          </Button>
        </div>
      </div>
    </div>
  );
};
