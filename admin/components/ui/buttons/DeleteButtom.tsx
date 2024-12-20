"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useState } from "react";
import { useIdContext } from "@/components/context/Context";

type DeleteButtomProps = {
  dataName: string;
  dateID: string;
};
export const BACKEND_END_POINT = process.env.BACKEND_URL;

export const DeleteButtom = ({ dataName, dateID }: DeleteButtomProps) => {
  const [inputValue, setInputValue] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [loeder, setLoeder] = useState(false);

  const { setDeletedId } = useIdContext();
  const safaValue = dataName;
  const placesId = dateID;

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleDelete = async (placesId: string) => {
    if (safaValue !== inputValue) {
      toast("Буруу байна", {
        description: "Газрын нэр таарахгүй байна",
        action: {
          label: "Хаах",
          onClick: () => {},
        },
      });
      return;
    }

    const option = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ placesId }),
    };

    try {
      setLoeder(true);
      const response = await fetch(`${BACKEND_END_POINT}/places`, option);
      const data = await response.json();
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      } else {
        toast("Амжилттай", {
          description: "Амжилттай Устгалаа",
          action: {
            label: "Хаах",
            onClick: () => {},
          },
        });
        setIsDialogOpen(false);
      }
      if (data.success == true) {
        setDeletedId(placesId);
      }
      setLoeder(false);
    } catch (e) {
      console.log(`error is:${e}`);
    }
  };

  return (
    <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <AlertDialogTrigger className="w-full text-start">
        Устгах
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Газар устгах</AlertDialogTitle>
          <AlertDialogDescription className=" bg-[#ffedef] px-4 rounded-lg py-2">
            <span className="text-sm not-italic text-red-600">
              <strong>Анхааруулга:</strong> Энэ үйлдлийг буцаах боломжгүй. Та
              итгэлтэй байна уу.
            </span>
          </AlertDialogDescription>
        </AlertDialogHeader>

        <main className="flex flex-col gap-2 py-5 border border-x-0">
          <div className="text-xs not-italic">
            Үргэлжлүүлэхийн тулд <span className="font-bold">{safaValue}</span>{" "}
            газрын нэрийг оруулна уу:
          </div>
          <Input
            id="inputValue"
            name="inputValue"
            value={inputValue}
            onChange={handleInputChange}
            type="text"
            className="px-3 h-10 rounded-lg w-full"
          />
        </main>
        <AlertDialogFooter>
          <AlertDialogCancel>Цуцлах</AlertDialogCancel>
          <div>
            {loeder === false ? (
              <Button
                onClick={() => handleDelete(placesId)}
                className="bg-red-600 hover:bg-red-400"
              >
                Устгах
              </Button>
            ) : (
              <Button className="bg-red-400 text-white min-w-[90px]">
                <div className="flex items-center justify-center">
                  <div className="w-6 h-6 border-4 border-white border-solid rounded-full animate-spin border-t-transparent"></div>
                </div>
              </Button>
            )}
          </div>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
