export const WhyChoose = () => {
  return (
    <main>
      <div className="container mx-auto my-20 flex flex-col gap-10">
        <div className="flex justify-center">
          <p className="text-2xl font-bold not-italic">
            Яагаад биднийг сонгох вэ?
          </p>
        </div>
        <div>
          <div className="w-full lg:flex sm:grid sm:grid-cols-4 lg:justify-between gap-7">
            <div className="bg-[#405FF212] p-4 rounded-2xl w-[300px] h-[200px] flex flex-col items-center justify-center gap-2 text-center">
              <p className="font-semibold text-SecondColor text-lg">
                Өргөн сонголттой газар
              </p>
              <p className="text-sm">
                Хүссэн байршилдаа тохирсон газрыг онлайнаар хялбар хайх,
                захиалах боломж.
              </p>
            </div>
            <div className="bg-[#405FF212] p-4 rounded-2xl w-[300px] h-[200px] flex flex-col items-center justify-center gap-2 text-center">
              <p className="font-semibold text-SecondColor text-lg">
                Найдвартай үйлчилгээ
              </p>
              <p className="text-sm">
                Манай вэбсайт дээрх бүх газрууд хууль ёсны баталгаатай.
              </p>
            </div>
            <div className="bg-[#405FF212] p-4 rounded-2xl w-[300px] h-[200px] flex flex-col items-center justify-center gap-2 text-center">
              <p className="font-semibold text-SecondColor text-lg">
                Хурдан шуурхай процесс
              </p>
              <p className="text-sm">
                Захиалга хийхээс эхлээд гүйлгээний бүх үе шатыг түргэн шуурхай
                гүйцэтгэнэ.
              </p>
            </div>
            <div className="bg-[#405FF212] p-4 rounded-2xl w-[300px] h-[200px] flex flex-col items-center justify-center gap-2 text-center">
              <p className="font-semibold text-SecondColor text-lg">
                24/7 Харилцагчийн дэмжлэг
              </p>
              <p className="text-sm">
                Аливаа асуулт, асуудлыг хурдан шийдвэрлэхийн тулд байнгын
                харилцагчийн үйлчилгээ.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
