import Navbar from "../Components/Navbar";
import template from "../assets/template.png";
import food from "../assets/food.png";
import contactUs from "../assets/contactUs.png";
import CommentForm from "../Components/CommentForm";

export default function AboutUs() {
  return (
    <div className="font-main-font">
      <Navbar />
      <div className="w-full h-full text-center text-xl top-[12%] left-[34%] pt-[7%] pb-[3%]">
        <span className="text-6xl">About us</span>
        <span className="line-clamp-4">
          Recipes are like a map, guiding us through the flavors, textures, and
          traditions of the world.
        </span>
      </div>
      <div
        className="border-4 w-full flex flex-wrap gap-[15%] top-[32%] bg-url(${bg}) place-content-between pl-[120px] pr-[120px] p-[25px] place-items-center bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${food})` }}
      >
        <div className="w-[40%] text-center p-[20px]">
          <span className="text-6xl text-white">Our Mission</span>
          <span className="line-clamp-none text-xl text-justify text-white">
            One of the most iconic forms of coking is grilling, where food is
            placed directly over an open flame or hot coals. This method imparts
            a smoky, charred flavor to ingredients like meat, vegetables, and
            even fruits. The sizzle of food hitting the grill and the
            tantalizing aroma of smoke wafting through the air create an
            irresistible sensory experience.
          </span>
        </div>
        <div className="w-[535px] flex flex-wrap gap-[10px]">
          <img src={template} className="w-[262px] h-[193px] rounded-lg"></img>
          <img src={template} className="w-[262px] h-[193px] rounded-lg"></img>
          <img src={template} className="w-[535px] h-[344px] rounded-lg"></img>
        </div>
      </div>
      <div className="text-center p-[5%]">
        <span className="text-6xl">Meet our team</span>
      </div>
      <div className="pb-[7%] ml-[17.2%] h-[770px] w-[959px] grid grid-rows-3 grid-flow-col gap-[10px]">
        <img
          src={template}
          className="w-[626px] h-[440px] rounded-[7%] row-span-2 col-span-2"
        ></img>
        <img
          src={template}
          className=" w-[310px] h-[220px] rounded-[7%] right-[228px] top-[1372px]"
        ></img>
        <img src={template} className="w-[310px] h-[220px] rounded-[7%] "></img>
        <img src={template} className="w-[310px] h-[220px] rounded-[7%] "></img>
        <img src={template} className="w-[310px] h-[220px] rounded-[7%]"></img>
        <img src={template} className="w-[310px] h-[220px] rounded-[7%]"></img>
      </div>
      <div className="flex justify-center">
        <div
          className="w-[700px] h-[500px] bg-contain bg-center bg-no-repeat pb-[50px] "
          style={{ backgroundImage: `url(${contactUs})` }}
        >
          <div className="h-[600px] text-center p-[4%]">
            <span className="text-5xl ">Contact Us</span>
            <br />
            <CommentForm
              style="mt-[60px] h-[250px] w-[83%] rounded-[10px] border-[1px] border-black px-[10px] py-[10px] resize-none pb-[50px]"
              placeholder="Send us a message..."
              name="feedback"
              buttonstyle="bg-33B249 border-black border-1 shadow-lg rounded-full w-[150px] h-[40px] text-white"
              onSubmit={() => console.log}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
