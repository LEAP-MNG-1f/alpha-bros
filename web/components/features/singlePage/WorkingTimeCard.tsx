import { roboto700 } from "@/app/fonts/fonts";

type TimeCardProps = {
  day?: string;
  open: string;
  close: string;
};

export default function WorkingTimeCard({ day, open, close }: TimeCardProps) {
  return (
    <div className={`flex gap-4  ${roboto700.className} text-base`}>
      <div className="flex flex-col">
        <div>{day}</div>
        <div className="flex">
          {open} - {close}
        </div>
      </div>
    </div>
  );
}
