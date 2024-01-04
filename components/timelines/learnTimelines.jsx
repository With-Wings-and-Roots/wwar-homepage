"use client"
import RangeArrowSVG from '@/components/common/RangeArrowSVG';
import { useState } from 'react';
import CloseIcon from '@/components/page/closeIcon';
import PageTitle from '@/components/page/pageTitle';
import GeneralText from '@/components/page/generalText';
import Image from 'next/image';

const LearnTimelines = ()=>{
  const [popupOpen, setPopupOpen] = useState(false)

  return<>
    <div onClick={()=>setPopupOpen(true)} className={`flex gap-2 text-base text-wwr_gray_storm cursor-pointer`}>
      <div>Learn how these timelines were made</div>
      <div className={`rotate-180 w-5`}><RangeArrowSVG fill={"#46464d"}/></div>
    </div>

    {
      popupOpen && <div className={`w-screen min-h-screen absolute left-0 py-20 top-0 z-[9999]`}>
        <div className={`w-screen h-screen fixed top-0 left-0 opacity-80 bg-wwr_black`}>

        </div>
        <div className={`global_width bg-wwr_white h-full relative p-4`}>
          <div onClick={()=>setPopupOpen(false)} className={`w-full flex justify-end`}><CloseIcon closeLink={""} /></div>
          <div className={`px-20`}>
          <PageTitle title={"Who created this timeline?"}/>
          <div className={`flex gap-10`}>
            <div className={`w-2/3`}>
              <GeneralText>
                <div className={`flex flex-col gap-6`}>
                  <p>These timelines were a collaboration driven primarily by volunteers. The selection of events and
                    approach of content was developed in conversation between editors and contributors, as well as
                    academic and community advisors.</p>
                  <div>
                    <div className={`font-bold`}>Editors:</div>
                    <p>Olga Gerstenberger, Christina Antonakos-Wallace, Serkan Demiral, Regina Knoll, Rachel Landry,
                      Anna
                      Baker & Lotti Schulz
                    </p>
                  </div>
                  <div>
                    <div className={`font-bold`}>Contributors:</div>
                    <p>Stefania Animento, Christine Boelian, Anthony Chase, Kadija Diallo, Emily Hackerson, Lydia
                      Galonski, Danielle Goonan, Lara Jacobs, Henriette Jankow, Maral Jekta, Alyssa Jocson, Laura
                      Lambert,
                      Karen Maniraho, Aseem Mehta, Maria Rutschke, Anna Schmitt
                    </p>
                  </div>
                  <div>
                    <div className={`font-bold`}>Academic and Community Advisors:</div>
                    <p>Dr. Emily Thuma, Dr. Marina Kaneti, Dr. Kein Nghi Ha, Dr. Maria do Mar Castro Varela
                      Dr. Iman Attia, Dr. Alexandra Delano
                    </p>
                  </div>
                  <p>
                    Ariela Kachmer – NY Coalition Of Radical Educators, Manuela Bauche – August Bebel Institute, Tahir
                    Della – Initiative of Black Germans., Sharon Dodua Otoo, Julius Franklin, Nadine Golly – Leuphana
                    University Lüneburg, Handan Kaymak, Berivan Inci – Antidiscrimination Network Berlin of the Turkish
                    Union Berlin, Beate Klammt – Anne Frank Center, Jacob Langford – Humboldt University Berlin, Nzitu
                    Tahir, John Mukiibi – Anti-discrimination Office Cologne, Kofi Ohene-Dokyi – Project JUMA, Cigir
                    Özyurt, Youth Theater Buro Berlin, Judith Rahner, Amadeu Antonio Foundation, Salma Rafiq-Haya –
                    Gladt
                    e.V.,Yasemin Shooman, Academy of the Jewish Museum Berlin, Nursemin Sönmez, Gülsah Stapel, Serdar
                    Yazar, Seth Rader, the James Baldwin School, David Lackey- Whirlwind Creative
                  </p>
                  <div>
                    <div className={`font-bold`}>Translators:</div>
                    <p>Regina Knoll, Manjiri Palicha, Forrest Holmes, Jennifer Theodor, Marc Holland-Cunz, Paula
                      Fuehrer,
                      Ilka Russy, Simran Sodhi, Lotti Schulz
                    </p>
                  </div>
                  <div>
                    <div className={`font-bold`}>Contributing Funders:</div>
                    <p>The Checkpoint Charlie Foundation, Humanity in Action; and The EVZ Foundation
                    </p>
                  </div>
                </div>
              </GeneralText>
            </div>
            <div className={`w-1/3 shrink-0 text-wwr_gray_storm flex flex-col gap-6`}>
              <div>
                <Image className={`aspect-square w-full h-full`} width={400} height={400} src={"/Serkan_headshot.jpg"}
                       alt={"Serkan Demiral"} />
              </div>
              <div className={`font-normal text-wwr_black text-2xl`}>In Memory of Serkan Demiral</div>
             <div> <GeneralText>
               <p>This timeline is dedicated to our dear collaborator, Serkan Demiral, who gave much of his time during
                 a long battle with cancer to With Wings and Roots. Among his contributions, he was an editor for the
                 German timeline. Serkan brought a sharp mind, a huge heart, an expanse of generosity, and wonderful
                 sense of humor to our team. He is greatly missed.

               </p>
               <p className={`italic`}>These timelines are always evolving. We welcome your feedback and collaboration:
                 info@withwingsandroots.com</p>
             </GeneralText></div>
            </div>
          </div>
          </div>
        </div>

      </div>
    }

  </>
}

export default LearnTimelines;