"use client";

import { Trash2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { IPostDocument } from "@/mongodb/models/post";
import PostOptions from "./PostOptions";
import { useState } from "react";
import Image from "next/image";
import deletePostAction from "@/actions/deletePostAction";
import { useUser } from "@clerk/nextjs";
import { Button } from "./ui/button";
import ReactTimeago from "react-timeago";
import { Badge } from "./ui/badge";
import { toast } from "sonner";

function Post({ post }: { post: IPostDocument }) {
  const { user } = useUser();

  const isAuthor = user?.id === post.user.userId;

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);
  return (
    <div className="bg-white rounded-md border">
      <div className="p-4 flex space-x-2">
        <div>
          <Avatar>
            <AvatarImage src={post.user.userImage} />
            <AvatarFallback>
              {post.user.firstName?.charAt(0)}
              {post.user.lastName?.charAt(0)}
            </AvatarFallback>
          </Avatar>
        </div>

        <div className="flex justify-between flex-1">
          <div>
            <p className="font-semibold">
              {post.user.firstName} {post.user.lastName}{" "}
              {isAuthor && (
                <Badge className="ml-2" variant="secondary">
                  Author
                </Badge>
              )}
            </p>
            <p className="text-xs text-gray-400">
              @{post.user.firstName}
              {post.user.firstName}-{post.user.userId.toString().slice(-4)}
            </p>

            <p className="text-xs text-gray-400">
              <ReactTimeago date={new Date(post.createdAt)} />
            </p>
          </div>

          {isAuthor && (
            <Button
            className="px-2 md:px-4 py-1 md:py-2"
              variant="outline"
              onClick={() => {
                const promise = deletePostAction(post._id);
                toast.promise(promise, {
                  loading: "Deleting post...",
                  success: "Post deleted!",
                  error: "Error deleting post",
                });
              }}
            >
              <Trash2
                style={{ width: "18px", height: "18px" }}
              />
            </Button>
          )}
        </div>
      </div>

      <div className="relative">
        <p className="px-4 pb-2 mt-2">{post.text}</p>

        {post.imageUrl ? (
          <div className="relative cursor-pointer" onClick={handleOpenModal}>
            <Image
              src={post.imageUrl}
              alt="Post Image"
              width={500}
              height={500}
              className="w-full h-80 object-cover mx-auto"
            />
          </div>
        ) : null}
        {post.imageUrl
          ? isModalOpen && (
              <div
                className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
                onClick={handleCloseModal}
              >
                <div className="relative bg-white p-4">
                  <button
                    className="absolute top-2 right-2 text-black bg-[#F4F2ED] rounded-full px-2"
                    onClick={handleCloseModal}
                  >
                    X
                  </button>
                  <Image
                    src={post.imageUrl}
                    alt="Post Image"
                    width={500}
                    height={300}
                    className="object-contain"
                  />
                </div>
              </div>
            )
          : null}
      </div>

      <PostOptions postId={post._id} post={post} />
    </div>
  );
}

export default Post;
