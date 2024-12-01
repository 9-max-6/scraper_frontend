import NewBid from "@/components/new-bid";
import Image from "next/image";

export default function Home() {
  // define a function that fetches opportunities from the backend.
  const data = []

  return (
    <div className="bg-muted h-[100vh]">
      {
        data.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full">
            <div>
              No opportunities
            </div>
            <NewBid />
          </div>
        ) : (
          <div>
            {data.map((value) => {
              return (
                <div>
                  {value}
                </div>
              )
            })}
          </div>
        )
      }
    </div>
  );
}
