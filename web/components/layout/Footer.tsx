import { FacebookIcon } from "../ui/icons/FacebookIcon";
import { TwitterIcon } from "../ui/icons/TwitterIcon";
import { IGIcon } from "../ui/icons/IGIcon";
import { INIcon } from "../ui/icons/INIcon";
import Link from "next/link";
import { date, FooterData } from "@/constant/mockdatas";

export const Footer = () => {
  return (
    <main className="flex flex-col items-center my-20">
      <div className=" container p-20  rounded-2xl flex flex-col gap-4 bg-MainWhite">
        <div className="w-full h-10  border-b-2 font-semi-bold text-2xl">
          Луужин
        </div>
        <div className="w-full  flex justify-between">
          <div className="flex flex-col gap-4">
            <div>
              <p className="text-MainGray">УТАС</p>
              <p>+{FooterData.phoneNumber}</p>
            </div>
            {/*  */}
            <div>
              <p className="text-MainGray">MЭЙЛ</p>
              <p>{FooterData.mail}</p>
            </div>
            {/*  */}
            <div>
              <p className="text-MainGray">ХАЯГ</p>
              <p>{FooterData.address}</p>
            </div>
            <div className="flex gap-4 items-center">
              <Link
                href="https://www.facebook.com/"
                target="blank"
                className="flex items-center gap-1 "
              >
                <FacebookIcon /> Facebook
              </Link>
              <Link
                href="https://www.twitter.com"
                target="blank"
                className="flex items-center gap-1 "
              >
                <TwitterIcon /> Twitter
              </Link>
              <Link
                href="https://www.instagram.com"
                target="blank"
                className="flex items-center gap-1 "
              >
                <IGIcon /> Instagram
              </Link>
            </div>
          </div>
          {/*  */}
          <div className="flex flex-col gap-4 pr-40">
            <p className="text-MainGray">Хуудаснууд</p>
            <Link href={"/"}>Нүүр</Link>
            <Link href={"/menu"}>Газарууд</Link>
            <Link href={"/contact"}>Санал хүсэлт илгээх</Link>
            <Link href={"/about"}>Бидний тухай</Link>
          </div>
        </div>

        {/*  */}
        <div className="flex w-full h-10 text-xs pt-4 justify-between ">
          <div>{FooterData.year}-ноос хойш үйл ажиллагаа явуулж байна.</div>
          <div>Mongolia</div>
        </div>
      </div>
    </main>
  );
};
