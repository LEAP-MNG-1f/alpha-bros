import { isUserLoggedAndAdmin } from "@/lib/isAdmin";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default async function Home() {
  const isAuthorized = await isUserLoggedAndAdmin();
  if (!isAuthorized.loggedIn) {
    return (
      <div className="w-screen h-screen flex items-center justify-center p-2 bg-white">
        <header className="text-center">
          <SignedOut>
            <SignInButton>
              <div className="w-[350px] h-[350px] border rounded-xl bg-gray-100 shadow-lg flex flex-col gap-7 items-center justify-center p-5">
                <span className="font-bold text-[35px] text-gray-800">
                  Welcome Back
                </span>
                <button className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition duration-300">
                  Sign in
                </button>
              </div>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <UserButton
              showName
              appearance={{
                elements: {
                  userButtonBox: "bg-green-200 border border-2 rounded-md",
                },
              }}
            />
          </SignedIn>
        </header>
      </div>
    );
  } else {
    if (isAuthorized.isAdmin) {
      redirect("/admin");
    } else {
      return (
        <div className="w-screen h-screen flex flex-col items-center justify-center gap-2 p-2 bg-white">
          <header className="text-center">
            <SignedOut>
              <SignInButton></SignInButton>
            </SignedOut>
          </header>
          <div className="w-[350px] h-[350px] border rounded-xl bg-gray-100 shadow-lg flex flex-col gap-7 items-center justify-center p-5">
            <span className="font-bold text-[35px] text-gray-800">
              <SignedIn>
                <UserButton
                  showName
                  appearance={{
                    elements: {
                      userButtonBox: " border border-2 p-2 rounded-md",
                    },
                  }}
                />
              </SignedIn>
            </span>

            <p className="text-black mt-4 font-bold text-lg ">
              You are not an admin
            </p>
          </div>
        </div>
      );
    }
  }
}
