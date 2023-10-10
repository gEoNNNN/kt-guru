import Inputbox from "../Components/Inputbox/Inputbox";
import Navbar from "../Components/Navbar";

export default function RecipePage() {
  return (
    <>
      <div>
        <Navbar />
      </div>
      <div className="w-[550px] h-[auto]">
        <span className="absolute top-[26%] text-2xl font-main-font">
          Choose your ingredients:
        </span>
        <Inputbox
          name="Search here"
          style="flex w-[300px] px-[13px] py-[0.3%] my-4 border-2 border-black rounded-full absolute top-[30%]"
        ></Inputbox>
        <span className="absolute top-[39%] text-2xl font-main-font">
          Selected:
        </span>
      </div>
    </>
  );
}
