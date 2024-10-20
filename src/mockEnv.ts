import { IS_DEV_MODE, TELEGRAM_DATA } from '@/constants';
import { mockTelegramEnv, parseInitData, retrieveLaunchParams } from '@telegram-apps/sdk-react';

// It is important, to mock the environment only for development purposes. When building the
// application, import.meta.env.DEV will become false, and the code inside will be tree-shaken,
// so you will not see it in your final bundle.
if (IS_DEV_MODE) {
  let shouldMock: boolean;

  // Try to extract launch parameters to check if the current environment is Telegram-based.
  try {
    // If we are able to extract launch parameters, it means that we are already in the
    // Telegram environment. So, there is no need to mock it.
    retrieveLaunchParams();
    // We could previously mock the environment. In case we did, we should do it again. The reason
    // is the page could be reloaded, and we should apply mock again, because mocking also
    // enables modifying the window object.
    shouldMock = !!sessionStorage.getItem('____mocked');
  } catch (e) {
    shouldMock = true;
  }

  if (shouldMock) {
    let initDataRaw = TELEGRAM_DATA;
    if (!TELEGRAM_DATA) {
      initDataRaw = new URLSearchParams([
        [
          'user',
          JSON.stringify({
            id: 5188202357,
            first_name: 'Hoàng',
            last_name: 'Minh',
            username: 'tnmhoang',
            language_code: 'en',
            allows_write_to_pm: true,
          }),
        ],
        ['hash', '19ce3a63952b939ca8df39f830f3516f2bdc88973dd8194b0cb02ddf9ccc3a8f'],
        ['auth_date', '1728400032'],
      ]).toString();
    }

    mockTelegramEnv({
      themeParams: {
        accentTextColor: '#6ab2f2',
        bgColor: '#17212b',
        buttonColor: '#5288c1',
        buttonTextColor: '#ffffff',
        destructiveTextColor: '#ec3942',
        headerBgColor: '#17212b',
        hintColor: '#708499',
        linkColor: '#6ab3f3',
        secondaryBgColor: '#232e3c',
        sectionBgColor: '#17212b',
        sectionHeaderTextColor: '#6ab3f3',
        subtitleTextColor: '#708499',
        textColor: '#f5f5f5',
      },
      initData: parseInitData(initDataRaw),
      initDataRaw,
      version: '7.2',
      platform: 'tdesktop',
    });
    sessionStorage.setItem('____mocked', '1');

    console.info(
      'As long as the current environment was not considered as the Telegram-based one, it was mocked. Take a note, that you should not do it in production and current behavior is only specific to the development process. Environment mocking is also applied only in development mode. So, after building the application, you will not see this behavior and related warning, leading to crashing the application outside Telegram.',
    );
  }
}
