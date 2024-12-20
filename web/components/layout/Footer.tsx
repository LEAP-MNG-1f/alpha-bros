import { FacebookIcon } from "../ui/icons/FacebookIcon";
import { TwitterIcon } from "../ui/icons/TwitterIcon";
import { IGIcon } from "../ui/icons/IGIcon";
import Link from "next/link";
import { date, FooterData } from "@/constant/mockdatas";
import { LightTower } from "../ui/icons/LightTower";

export const Footer = () => {
  return (
    <main className="flex flex-col items-center my-20">
      <div className=" container p-20  rounded-2xl flex flex-col gap-4 bg-MainWhite">
        <div className="w-full h-10  border-b-2 font-semi-bold text-2xl">
          <div className="flex">
            <LightTower />
            <p className=" font-bold text-[22px] w-auto text-SecondColor not-italic leading-normal">
              LIGHT HOUSE
            </p>
          </div>
        </div>
        <div className="w-full  flex justify-between">
          <div className="flex flex-col gap-4">
            <div>
              <p className="text-lg font-semibold text-MainGray">УТАС</p>
              <p>+{FooterData.phoneNumber}</p>
            </div>
            {/*  */}
            <div>
              <p className="text-lg font-semibold text-MainGray">MЭЙЛ</p>
              <p>{FooterData.mail}</p>
            </div>
            {/*  */}
            <div>
              <p className="text-lg font-semibold text-MainGray">ХАЯГ</p>
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
            <p className="text-lg font-semibold text-MainGray">Хуудаснууд</p>
            <Link href={"/"}>
              <p className="text-base not-italic leading-normal font-normal text-MainColor">
                Нүүр
              </p>
            </Link>
            <Link href={"/menu"}>
              <p className="text-base not-italic leading-normal font-normal text-MainColor">
                Газарууд
              </p>
            </Link>
            <Link href={"/contact"}>
              <p className="text-base not-italic leading-normal font-normal text-MainColor">
                Санал хүсэлт илгээх
              </p>
            </Link>
            <Link href={"/about"}>
              <p className="text-base not-italic leading-normal font-normal text-MainColor">
                Бидний тухай
              </p>
            </Link>
          </div>
        </div>

        {/*  */}
        <div className="flex w-full h-10 text-xs pt-4 justify-between border-t-2">
          <div className="text-base not-italic leading-normal font-normal text-MainColor">
            © {FooterData.year}-ноос хойш үйл ажиллагаа явуулж байна.
          </div>
          <div className="pr-[154px]">
            <div className="w-[157px] flex justify-center gap-2">
              <p className=" text-base not-italic leading-normal font-normal text-MainColor">
                Монгол
              </p>
              <div className="flex items-center justify-center">
                <div className="bg-black w-1 h-1 rounded-full"></div>
              </div>
              <p className=" text-base not-italic leading-normal font-normal text-MainColor">
                Улаанбаатар
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
