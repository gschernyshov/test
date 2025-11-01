// __tests__/AppLoader.test.tsx
import { render, screen, waitFor } from "@testing-library/react";
import { TonConnectUIProvider, useTonAddress, useTonWallet } from "@tonconnect/ui-react";
import { AppLoader } from "../app/hoc/AppLoader";

const mockSetInitialized = jest.fn();
const mockSetWallet = jest.fn();
const mockClearWallet = jest.fn();

jest.mock("../app/store/TonStore", () => ({
  useTonStore: () => ({
    setInitialized: mockSetInitialized,
    setWallet: mockSetWallet,
    clearWallet: mockClearWallet,
  }),
}));

jest.mock("@tonconnect/ui-react", () => ({
  ...jest.requireActual("@tonconnect/ui-react"),
  useTonAddress: jest.fn(() => "EQD1234567890123456789012345678901234567"),
  useTonWallet: jest.fn(() => ({ id: "mockWallet" })),
  TonConnectUIProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

describe("AppLoader", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("должен отображать индикатор загрузки", async () => {
    render(
      <TonConnectUIProvider>
        <AppLoader>
          <div>Контент</div>
        </AppLoader>
      </TonConnectUIProvider>
    );

    expect(screen.getByLabelText(/Инициализация приложения/i)).toBeInTheDocument();
    await waitFor(() => expect(screen.getByText(/Контент/i)).toBeInTheDocument());
  });

  it("должен показать дочерний контент после загрузки", async () => {
    render(
      <TonConnectUIProvider>
        <AppLoader>
          <div>Контент</div>
        </AppLoader>
      </TonConnectUIProvider>
    );

    await waitFor(() => expect(screen.getByText(/Контент/i)).toBeInTheDocument());
  });

  it("должен вызвать clearWallet, если адрес или кошелек отсутствуют", async () => {
    (useTonAddress as jest.Mock).mockReturnValue(null);
    (useTonWallet as jest.Mock).mockReturnValue(null);

    render(
      <TonConnectUIProvider>
        <AppLoader>
          <div>Контент</div>
        </AppLoader>
      </TonConnectUIProvider>
    );

    expect(mockClearWallet).toHaveBeenCalled();
  });

  it("должен обработать ошибку при неверном адресе", async () => {
    const mockConsole = jest.spyOn(console, "error").mockImplementation(() => {});
    (useTonAddress as jest.Mock).mockReturnValue("invalid");

    render(
      <TonConnectUIProvider>
        <AppLoader>
          <div>Контент</div>
        </AppLoader>
      </TonConnectUIProvider>
    );

    // Ждём, пока индикатор загрузки исчезнет
    await waitFor(() =>
      expect(screen.queryByLabelText(/Инициализация приложения/i)).not.toBeInTheDocument()
    );

    // Проверяем, что setWallet и setInitialized не вызвались
    expect(mockSetWallet).not.toHaveBeenCalled();
    expect(mockSetInitialized).not.toHaveBeenCalled();

    mockConsole.mockRestore();
  });
});
