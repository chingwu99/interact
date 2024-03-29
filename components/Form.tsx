"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
// import custom hook
import useLoginModal from "@/hooks/useLoginModal";
import useRegisterModal from "@/hooks/useRegisterModal";
// import components
import Avatar from "./Avatar";
import Button from "./Button";
// import type
import { User } from "@prisma/client";
import { UserWithFollowersCount } from "@/types";
// import others
import axios from "axios";
import { toast } from "react-hot-toast";

interface FormProps {
  placeholder: string;
  isComment?: boolean;
  postId?: string;
  currentUser: User | null;
  avatarUser: UserWithFollowersCount | null;
}

const Form: React.FC<FormProps> = ({
  placeholder,
  isComment,
  postId,
  currentUser,
  avatarUser,
}) => {
  const router = useRouter();
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();

  const [body, setBody] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true);

      const url = isComment ? `/api/comments?postId=${postId}` : "/api/posts";

      await axios.post(url, { body });

      toast.success("Interact created");
      setBody("");

      router.refresh();
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }, [body, isComment, postId, router]);

  return (
    <div className="border-b-[1px] border-neutral-800 px-5 py-2">
      {currentUser ? (
        <div className="flex flex-row gap-4">
          <div>
            <Avatar userId={currentUser?.id} avatarUser={avatarUser} />
          </div>
          <div className="w-full">
            <textarea
              disabled={isLoading}
              onChange={(event) => setBody(event.target.value)}
              value={body}
              className="
                disabled:opacity-80
                peer
                resize-none 
                mt-3 
                w-full 
                bg-black 
                ring-0 
                outline-none 
                text-[20px] 
                placeholder-neutral-500 
                text-white
              "
              placeholder={placeholder}
            ></textarea>
            <hr
              className="
                opacity-0 
                peer-focus:opacity-100 
                h-[1px] 
                w-full 
                border-neutral-800 
                transition"
            />
            <div className="mt-4 flex flex-row justify-end">
              <Button
                disabled={isLoading || !body}
                onClick={onSubmit}
                label="Interact"
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="py-8 flex flex-col justify-center items-center">
          <Image
            alt="Logo"
            src="/officialLogo.png"
            quality={100}
            height="71"
            width="340"
          />
          <h1 className="text-white text-xl text-center mb-4 font-bold my-8">
            Welcome to Interact
          </h1>
          <div className="flex flex-row items-center justify-center gap-4">
            <Button label="Login" onClick={loginModal.onOpen} />
            <Button label="Register" onClick={registerModal.onOpen} secondary />
          </div>
        </div>
      )}
    </div>
  );
};

export default Form;
