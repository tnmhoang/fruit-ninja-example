import Button3D from '@/components/common/Button3D';
import { LegIcon } from '@/components/icons';
import SectionScreen from '@/components/SectionScreen';
import { APP_URLS } from '@/constants';
import { useBackButton } from '@telegram-apps/sdk-react';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const AboutPage = () => {
  const bb = useBackButton();
  const navigate = useNavigate();

  useEffect(() => {
    bb.show();
    bb.on('click', () => navigate(APP_URLS.HOME));
    return () => bb.hide();
  }, []);

  return (
    <SectionScreen className="flex flex-1 flex-col">
      <div className="relative flex-1 px-6">
        <div
          style={{
            backgroundImage: `url('./imgs/bg-about.png')`,
          }}
          className="absolute left-0 top-0 z-0 h-[301px] w-full bg-cover bg-center bg-no-repeat"
        ></div>
        <div className="relative z-10 flex flex-col items-center">
          <div className="text3d pt-10 font-backToSchool text-[40px] uppercase">About</div>
          <div className="w-full space-y-10 pt-40">
            <div className="relative w-full rounded-3xl border-2 border-[#6A5B46] bg-[#C1AD90] p-2 pt-8">
              <Button3D
                className="pointer-events-none absolute -top-6 left-1/2 flex -translate-x-1/2 transform items-center"
                classBtn={
                  'flex flex-col justify-center items-center border-b border-white h-11 !rounded-2xl !z-10 !bg-[#C1AD90] !rounded-full px-4 py-[10px]'
                }
                classBtnBottom={'!rounded-2xl !bg-[#6A5B46] !z-0 !h-11 !-bottom-1 !rounded-full'}
              >
                <div className="relative z-10 flex w-full items-center justify-center gap-2">
                  <div className="w-6">
                    <LegIcon />
                  </div>
                  <div className="text3d-sm whitespace-nowrap font-backToSchool text-[20px]">
                    About DogLibre
                  </div>
                  <div className="w-6">
                    <LegIcon />
                  </div>
                </div>
              </Button3D>
              <div className="space-y-2 rounded-[20px] bg-[#E8E0D5] p-3 font-semibold text-[#352E23]">
                <div>
                  DogLibre is a meme-powered initiative dedicated to improving the lives of stray
                  and pet dogs globally, using blockchain technology to create real impact.
                </div>
              </div>
            </div>

            <div className="relative w-full rounded-3xl border-2 border-[#6A5B46] bg-[#C1AD90] p-2 pt-8">
              <Button3D
                className="pointer-events-none absolute -top-6 left-1/2 flex -translate-x-1/2 transform items-center"
                classBtn={
                  'flex flex-col justify-center items-center border-b border-white h-11 !rounded-2xl !z-10 !bg-[#C1AD90] !rounded-full px-4 py-[10px]'
                }
                classBtnBottom={'!rounded-2xl !bg-[#6A5B46] !z-0 !h-11 !-bottom-1 !rounded-full'}
              >
                <div className="relative z-10 flex w-full items-center justify-center gap-2">
                  <div className="w-6">
                    <LegIcon />
                  </div>
                  <div className="text3d-sm whitespace-nowrap font-backToSchool text-[20px]">
                    Why DogLibre?
                  </div>
                  <div className="w-6">
                    <LegIcon />
                  </div>
                </div>
              </Button3D>
              <ul className="no-scrollbar list-disc space-y-2 overflow-x-auto rounded-[20px] bg-[#E8E0D5] p-3 pl-8 font-semibold text-[#352E23]">
                <li>
                  <b>Meme Culture with a Purpose:</b> We blend humor with cutting-edge technology,
                  turning memes into a force for real-world change.
                </li>

                <li>
                  <b>Blockchain Transparency:</b> Every rescue is tracked on the blockchain,
                  ensuring trust and accountability within our community.
                </li>

                <li>
                  <b>Innovative Tech:</b> We're transforming dog care through AI and IoT solutions,
                  including our smart wearables that are in development.
                </li>

                <li>
                  <b>Dynamic NFTs and Games:</b> Our dNFTs and interactive games allow for deeper
                  engagement, giving the community more ways to contribute to our mission.
                </li>

                <li>
                  <b>Global Reach:</b> We partner with shelters worldwide to ensure stray dogs
                  receive the care they need.
                </li>

                <li>
                  <b>Trusted by Industry Leaders:</b> Backed by key players from projects like
                  Bitget, Decentraland, MakerDAO, Polygon, and Gnosis, we combine credibility with
                  innovation, making DogLibre a scalable and impactful movement.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <nav className="fixed bottom-0 left-0 right-0 z-50 text-white">
        <div className="relative flex h-[96px] w-full gap-2 bg-gradient-to-t from-[#E0D6C7] to-[rgba(224,214,199,0)] p-4">
          <Link to={'https://doglibre.gitbook.io/doglibre'} target="_blank" className="flex-1">
            <Button3D
              className="h-[56px]"
              classBtn={
                'flex flex-col justify-center items-center border-b border-white !rounded-[20px] !z-10 !bg-[#2F90DB]'
              }
              classBtnBottom={'!rounded-[20px] !bg-[#2673AF] !z-0'}
            >
              <div className="text-border-blue flex items-center gap-2 font-backToSchool">
                <div>Read Whitepaper</div>
              </div>
            </Button3D>
          </Link>

          <Button3D
            className="h-[56px] flex-1"
            classBtn={
              'flex flex-col justify-center items-center border-b border-white !rounded-[20px] !z-10 !bg-[#A9B957]'
            }
            classBtnBottom={'!rounded-[20px] !bg-[#656F34] !z-0'}
            onClick={() => navigate(APP_URLS.UPGRADE)}
          >
            <div className="text-border-green flex items-center gap-2 font-backToSchool">
              <div>Save a Dog</div>
            </div>
          </Button3D>
        </div>
      </nav>
    </SectionScreen>
  );
};

export default AboutPage;
