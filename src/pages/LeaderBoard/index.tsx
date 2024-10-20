import Button3D from '@/components/common/Button3D';
import {
  AboutIcon,
  AvatarIcon,
  NextIcon,
  PrevsIcon,
  Top1Icon,
  Top2Icon,
  Top3Icon,
  VolunteerPointIcon,
} from '@/components/icons';
import SectionScreen from '@/components/SectionScreen';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';
import { useLeaderboard, useListLeaderboard } from '@/hooks/useLeaderboard';
import useProfileStore from '@/hooks/useProfileStore';
import { cn, formatCurrency, getName } from '@/lib/utils';
import { CONFIG_LEADERBOARD_RANKING, LeaderboardLevel } from '@/types';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Navigation } from 'swiper/modules';
import { useBackButton } from '@telegram-apps/sdk-react';
import { useNavigate } from 'react-router-dom';
import debounce from 'lodash.debounce';
import { APP_URLS } from '@/constants';
import AboutDialog from '@/components/common/AboutDialog';
import TopUsersLoading from './components/TopUsersLoading';

const LeaderBoardPage = () => {
  const { profile } = useProfileStore();
  const navigate = useNavigate();

  const [currentRank, setCurrentRank] = useState<number>(profile?.rank_index || 0);
  const [openAbout, setOpenAbout] = useState<boolean>(false);

  const [currentRankDetail, setCurrentRankDetail] = useState<LeaderboardLevel>();
  const [nextRankDetail, setNextRankDetail] = useState<LeaderboardLevel>();

  const { data: listLeaderboardData, isLoading: listLeaderboardLoading } = useListLeaderboard();

  const { data: leaderboardData, isLoading: leaderboardLoading } = useLeaderboard(
    listLeaderboardData ? listLeaderboardData[currentRank].level : undefined,
  );

  const swiperRef = useRef<SwiperRef>(null);
  const bb = useBackButton();

  const debouncedQuantity = useCallback(
    debounce((index: number) => {
      setCurrentRank(index);
    }, 500),
    [],
  );

  const progressWidth = useMemo(() => {
    if (profile?.volunteer_rank && nextRankDetail?.min) {
      if (profile?.volunteer_rank >= nextRankDetail?.min) return 100;
      return (100 * profile.volunteer_rank) / nextRankDetail.min;
    }
    return 0;
  }, [profile?.volunteer_rank, nextRankDetail?.min]);

  const handleSlideChange = () => {
    if (
      (swiperRef.current?.swiper.activeIndex || swiperRef.current?.swiper.activeIndex === 0) &&
      listLeaderboardData !== undefined
    ) {
      debouncedQuantity(swiperRef.current?.swiper.activeIndex);
    }
  };

  /* useEffect(()=> {
    swiperRef.current?.swiper.slideTo()
  },[profile?.rank_level]) */

  useEffect(() => {
    debouncedQuantity.cancel();
  }, [debouncedQuantity]);

  useEffect(() => {
    if (
      (swiperRef.current?.swiper.activeIndex || swiperRef.current?.swiper.activeIndex === 0) &&
      listLeaderboardData !== undefined
    ) {
      setNextRankDetail(
        listLeaderboardData[
          swiperRef.current?.swiper.activeIndex! + 1 >= listLeaderboardData.length - 1
            ? listLeaderboardData.length - 1
            : swiperRef.current?.swiper.activeIndex! + 1
        ],
      );
      setCurrentRankDetail(listLeaderboardData[swiperRef.current?.swiper.activeIndex!]);
    }
  }, [currentRank, listLeaderboardData, swiperRef.current]);

  useEffect(() => {
    bb.show();
    bb.on('click', () => navigate(APP_URLS.HOME));
    return () => bb.hide();
  }, []);

  const configRankCurrent = useMemo(
    () => CONFIG_LEADERBOARD_RANKING[currentRank],
    [currentRank, CONFIG_LEADERBOARD_RANKING],
  );

  return (
    <SectionScreen className="flex flex-1 flex-col pb-0">
      <div
        className={cn(
          'flex h-full bg-gradient-to-b from-[#AD9471] to-[#473D2E] transition-all duration-300',
          configRankCurrent.backgroundColor,
        )}
      >
        <div
          style={{
            backgroundImage: `url("${'./imgs/bg-home.png'}")`,
          }}
          className="h-full w-full"
        >
          <div className="flex h-full max-h-screen flex-col px-4 pb-2">
            <div className="relative max-h-[180px] min-h-[180px] flex-1">
              <div className="absolute right-0 z-50 pt-5">
                <button
                  className="rounded-full"
                  onClick={() => {
                    setOpenAbout(true);
                  }}
                >
                  <AboutIcon className="w-8" />
                </button>
                <AboutDialog
                  title="How it works?"
                  content={
                    <div className="pt-3 font-medium text-[#352E23]">
                      Climb the ranks by collecting Howling Stars! Your rank is based on how many
                      Howling Stars you earn. Check the score bar to see how many points you need to
                      level up. Start in Pawsitive Pups and work your way up to become a Top Doggos
                    </div>
                  }
                  open={openAbout}
                  setOpen={setOpenAbout}
                />
              </div>
              <div className="absolute z-20 flex h-full w-full items-center justify-between">
                {swiperRef.current?.swiper.activeIndex ? (
                  <button onClick={() => swiperRef.current?.swiper.slidePrev()}>
                    <PrevsIcon />
                  </button>
                ) : (
                  <div></div>
                )}

                {(swiperRef.current?.swiper.activeIndex ||
                  swiperRef.current?.swiper.activeIndex === 0) &&
                listLeaderboardData &&
                swiperRef.current?.swiper.activeIndex < listLeaderboardData.length - 1 ? (
                  <button onClick={() => swiperRef.current?.swiper.slideNext()}>
                    <NextIcon />
                  </button>
                ) : (
                  <div></div>
                )}
              </div>
              {listLeaderboardData && profile && (
                <Swiper
                  ref={swiperRef}
                  onSlideChange={handleSlideChange}
                  initialSlide={listLeaderboardData.findIndex(
                    (leaderboard) => leaderboard.level === profile.rank_level,
                  )}
                  slidesPerView={1}
                  spaceBetween={30}
                  autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                  }}
                  modules={[Navigation]}
                  slideNextClass="!text-white"
                  className="mySwiper mx-8 h-full rounded-3xl"
                >
                  {listLeaderboardData.map((leaderboard, idx) => (
                    <SwiperSlide key={idx}>
                      <div className="flex h-full items-center justify-center">
                        <img
                          className="w-[180px]"
                          src={Object.values(CONFIG_LEADERBOARD_RANKING)[idx].logo}
                          alt={leaderboard.level}
                        />
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              )}
            </div>
            <div className="flex flex-col items-center justify-center gap-2 pt-2">
              <div className="text3d font-backToSchool text-[32px] capitalize">
                {currentRankDetail?.level.split('_').join(' ')}
              </div>
              <div className="flex items-center gap-[5px]">
                <VolunteerPointIcon className="h-6 w-6" />

                <div className="font-backToSchool text-lg">
                  {formatCurrency(profile?.volunteer_rank, 2)} /{' '}
                  {formatCurrency(nextRankDetail?.min, 2)}
                </div>
              </div>
              <div className="relative w-full rounded-full">
                <div className="progress-bar">
                  <div className="h-full w-full rounded-[20px] border border-[#c5b297] bg-[#E0D6C7]">
                    <div
                      className={cn(
                        'h-full rounded-[20px] bg-[#2F90DB] transition-all',
                        configRankCurrent.backgroundColor,
                      )}
                      style={{
                        width: `${progressWidth}%`,
                      }}
                    >
                      <div className="bar h-full w-full rounded-[20px] bg-transparent"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative mt-5 overflow-hidden rounded-[28px] border-2 border-[#FFFFFF66] bg-[#FFFFFF33] p-2 backdrop-blur-xl">
              <div className="no-scrollbar h-full overflow-hidden overflow-y-auto rounded-[20px]">
                <ScrollArea className="h-full">
                  <ul
                    className="no-scrollbar h-full space-y-[6px] pb-28"
                    style={{ overflowY: 'scroll' }}
                  >
                    {leaderboardLoading ? (
                      <TopUsersLoading length={5} />
                    ) : leaderboardData?.top_users && !(leaderboardData.top_users.length > 0) ? (
                      <div className="flex flex-col items-center justify-center pt-6">
                        <img src="./imgs/dog-coming-soon.png" width={166} height={150} />
                        <div className="pt-4 text-center font-backToSchool text-[16px]">
                          Be the first to claim your spot on the Leaderboard
                        </div>
                      </div>
                    ) : (
                      leaderboardData?.top_users.map((user, idx) => (
                        <li
                          key={user.telegram_id}
                          className="flex items-center justify-between rounded-[20px] bg-[#E8E0D5] p-3"
                        >
                          <div className="flex w-full items-center gap-3">
                            {idx === 0 && <Top1Icon className="h-10 w-10" />}
                            {idx === 1 && <Top2Icon className="h-10 w-10" />}
                            {idx === 2 && <Top3Icon className="h-10 w-10" />}
                            {idx > 2 && (
                              <div className="text3d-sm flex h-10 w-10 items-center justify-center font-backToSchool text-lg">
                                {idx + 1}
                              </div>
                            )}
                            <div className="flex flex-1 items-center gap-2 overflow-hidden">
                              <AvatarIcon
                                className="relative h-11 w-11 rounded-full border-2 border-[#352E23]"
                                username={user.username}
                              />
                              <div className="line-clamp-1 text-sm font-semibold text-[#352E23]">
                                {getName(user)}
                              </div>
                            </div>
                            <div className="relative flex items-center pl-1">
                              <span className="absolute -left-1 max-h-6 max-w-6">
                                <VolunteerPointIcon />
                              </span>
                              <div className="flex w-fit items-center justify-end rounded-full bg-[#FFFFFF] pl-5 pr-2 text-right font-backToSchool text-sm text-[#352E23]">
                                {formatCurrency(user.volunteer_rank, 2)}
                              </div>
                            </div>
                          </div>
                        </li>
                      ))
                    )}
                  </ul>
                </ScrollArea>
              </div>
              {currentRank === profile?.rank_index && (
                <Button3D
                  className={cn('absolute bottom-10 left-0 h-[68px] w-full')}
                  classBtn={cn(
                    'flex flex-col justify-center items-center border-b border-white !rounded-2xl !z-10',
                    configRankCurrent.styleCurrentRank.styleBtn,
                  )}
                  classBtnBottom={cn(
                    '!rounded-2xl !z-0',
                    configRankCurrent.styleCurrentRank.styleBtnBottom,
                  )}
                >
                  <div className="flex w-full items-center gap-3 p-3">
                    {leaderboardData &&
                      Number(leaderboardData?.current_user.user_current__rank) === 1 && (
                        <Top1Icon className="h-10 w-10" />
                      )}
                    {leaderboardData &&
                      Number(leaderboardData?.current_user.user_current__rank) === 2 && (
                        <Top2Icon className="h-10 w-10" />
                      )}
                    {leaderboardData &&
                      Number(leaderboardData?.current_user.user_current__rank) === 3 && (
                        <Top3Icon className="h-10 w-10" />
                      )}
                    {leaderboardData &&
                      Number(leaderboardData?.current_user.user_current__rank) > 3 && (
                        <div className="text3d-sm flex h-10 w-10 items-center justify-center font-backToSchool text-lg">
                          {leaderboardData &&
                            Number(leaderboardData?.current_user.user_current__rank)}
                        </div>
                      )}

                    <div className="flex flex-1 items-center gap-2 overflow-hidden">
                      <AvatarIcon
                        className="relative h-11 w-11 rounded-full border-2 border-[#352E23]"
                        username={profile?.username}
                      />
                      <div className="line-clamp-1 text-sm font-semibold text-[#352E23]">
                        {getName(leaderboardData?.current_user)}
                      </div>
                    </div>
                    <div className="relative flex items-center pl-1">
                      <span className="absolute -left-1 max-h-6 max-w-6">
                        <VolunteerPointIcon />
                      </span>
                      <div className="flex w-fit items-center justify-end rounded-full bg-[#DDE3BC] pl-5 pr-2 text-right font-backToSchool text-sm text-[#352E23]">
                        {formatCurrency(leaderboardData?.current_user.volunteer_rank, 2)}
                      </div>
                    </div>
                  </div>
                </Button3D>
              )}
            </div>
          </div>
        </div>
      </div>
    </SectionScreen>
  );
};

export default LeaderBoardPage;
