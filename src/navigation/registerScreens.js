import { createStackNavigator } from 'react-navigation';
import MyWallet from '@screens/home/MyWallet';
import TransBalanceConfirm from '@screens/home/TransBalanceConfirm';
import SignUp from '@screens/signUp/Register';
import ConfirmSMS from '@screens/signUp/ConfirmSMS';
import Register from '@screens/signUp/Register';
import CompanyCode from '@screens/signUp/CompanyCode';
import RequestCompanyCode from '@screens/signUp/RequestCompanyCode';
import CreatePassword from '@screens/signUp/CreatePassword';
import Login from '@screens/signIn/Login';
import WelcomeNew from '@screens/signIn/Welcome';
import SelectCompany from '@screens/signIn/SelectCompany';
import initRegisterProfile from '@screens/signUp/RegisterInitProfile';
import InformationPersonal from '@screens/signUp/InformationPersonal';
import onboarStepOne from '@screens/onboarding/StepOne';
import onboarStepTwo from '@screens/onboarding/StepTwo';
import onboarStepThree from '@screens/onboarding/StepThree';
import forgotSecretAnswer from '@screens/forgotYourPassword/SecretAnswer';
import Welcome from '@screens/welcome/Welcome';
import PaymentUsers from '@screens/nationalPayments/PaymentUsers';
import PaymentToContacts from '@screens/nationalPayments/PayContacts';
import ReceivedInternationalPayments from '@screens/internationalPayments/ReceivedInternationalPayments';
import RequestedInternationalPayments from '@screens/internationalPayments/RequestedInternationalPayments';
import RequestInternationalPayment from '@screens/internationalPayments/RequestInternationalPayment';
import ContactInformation from '@screens/nationalPayments/ContactInformation';
import PayConfirmation from '@screens/nationalPayments/PayConfirmation';
import ConfirmationRequestSend from '@screens/internationalPayments/ConfirmationRequestSend';
import ReceivedPaymentAccepted from '@screens/internationalPayments/ReceivedPaymentAccepted';
import ReceivedInternationalPayment from '@screens/internationalPayments/ReceivedInternationalPayment';
import ReceivedQRPayment from '@screens/paymentQR/QRPayment';
import ScanQR from '@screens/paymentQR/ScanQR';
import SearchByUserCode from '@screens/paymentQR/SearchByUserCode';
import paymentToEstablishment from '@screens/paymentQR/paymentToEstablishment';
import confirmationEstablishment from '@screens/paymentQR/confirmationEstablishment';
import Transfers from '@screens/transfers/Transfers';
import TransferWalletBank from '@screens/transfers/TransferWalletBank';
import TransferWalletBankSuccess from '@screens/transfers/TransferWalletBankSuccess';
import BankTransfer from '@screens/recharges/BankTransfer';
import Historics from '@screens/historics/Historics';
import EstablecimientosATM from '@screens/maps/EstablecimientosATM';
import Recharges from '@screens/recharges/Recharges';
import RechargeSuccessful from '@screens/recharges/RechargeSuccessful';
import ScanQrReceived from '@screens/recharges/ScanQrReceived';
import RechargeReceivedSuccessful from '@screens/recharges/RechargeReceivedSuccess';
import RechargesConfig from '@screens/recharges/RechargesConfig';
import MyCreditOptions from '@screens/credits/MyCreditOptions';
import CreditAcceptance from '@screens/credits/CreditAcceptance';
import CreditSuccessful from '@screens/credits/CreditSuccessful';
import AppConfirmationPin from '@screens/AppConfirmationPin';
import AppNewPin from '@screens/AppNewPin';
import AppPin from '@screens/AppPin';
import ConfirmationPinUser from '@screens/ConfirmationPinUser';
import BiometricChangeConfirmation from '@screens/BiometricChangeConfirmation';

import Level from '@screens/levels';
import LevelsInfo from '@screens/levels/LevelsInfo';
import BuyPoints from '@screens/levels/BuyPoints';
import DetailBuyPoints from '@screens/levels/DetailBuyPoints';
import ConfirmBuyPoints from '@screens/levels/ConfirmBuyPoints';
import CompleteProfilCredits from '@screens/credits/myHiredCredits/CompleteProfilCredits';
import CreditsContracted from '@screens/credits/myHiredCredits/CreditsContracted';
import ManualCreditPayment from '@screens/credits/ManualCreditPayment';
import ManualCreditPaymentSuccessful from '@screens/credits/ManualCreditPaymentSuccessful';
import ManualCreditPaymentTotalSuccessful from '@screens/credits/ManualCreditPaymentTotalSuccessful';
import MyCards from '@screens/myCards';
import ActivateCard from '@screens/myCards/ActivateCardScreen';
import ActivateCardPin from '@screens/myCards/ActivateCardPinScreen';
import ActivateCardConfirmation from '@screens/myCards/ActivateCardConfirmationScreen';
import RechargeCard from '@screens/myCards/RechargeCardScreen';
import RechargeCardConfirmation from '@screens/myCards/RechargeCardConfirmationScreen';
import ViewCard from '@screens/myCards/ViewCard';
import RequestCard from '@screens/myCards/RequestCard';
import ConfirmationRequestCard from '@screens/myCards/ConfirmationRequestCard';
import CancelCard from '@screens/myCards/CancelCardScreen';
import CancelCardCancel from '@screens/myCards/CancelCardCancelScreen';
import CancelCardConfirmation from '@screens/myCards/CancelCardConfirmationScreen';
import InfoReceivedCard from '@screens/myCards/InfoReceivedCard';
import PinUpdateScreen from '@screens/myCards/PinUpdate';
import PinUpdateConfirmation from '@screens/myCards/PinUpdateConfirmation';
import Store from '@screens/store/StoreScreen';
import StoreCategory from '@screens/store/StoreCategoryScreen';
import ShoppingList from '@screens/store/ShoppingList';
import CloseOffers from '@screens/store/CloseOffersScreen';
import StoreScanQR from '@screens/store/StoreScanQR';
import StoreShowQR from '@screens/store/StoreShowQR';
import StoreCaptureQR from '@screens/store/StoreCaptureQR';
import StoreConfirmation from '@screens/store/StoreConfirmation';
import StoreCashPurchase from '@screens/store/StoreCashPurchase';
import StoreProviderPayments from '@screens/store/StoreProviderPaymentsScreen';
import ProviderPayment from '@screens/store/ProviderPaymentScreen';
import ProviderPaymentAmount from '@screens/store/ProviderPaymentAmountScreen';
import ProviderPaymentSuccessful from '@screens/store/ProviderPaymentSuccessfulScreen';
import ProviderPaymentSaved from '@screens/store/ProviderPaymentSavedScreen';
import PurchasesSaved from '@screens/store/PurchasesSavedScreen';
import GiftcardSavedDetail from '@screens/store/GiftcardSavedDetailScreen';
import PurchaseSavedDetail from '@screens/store/PurchaseSavedDetailScreen';
import Configuration from '@screens/configuration/ConfigurationScreen';
import Contact from '@screens/contact/ContactScreen';
import ContactSuccessful from '@screens/contact/ContactSuccessfulScreen';
import ConfirmationBuyStore from '@screens/store/ConfirmationBuyStore';
import GiftCardsList from '@screens/giftCards/GiftCardsList';
import GiftCardDetails from '@screens/giftCards/GiftCardDetails';
import GiftCardConfirmation from '@screens/giftCards/SuccessfulPurchase';
import MyProfile from '@screens/myProfile';
import PersonalInformation from '@screens/myProfile/PersonalInformation';
import ContactInformationProfile from '@screens/myProfile/ContactInformationProfile';
import WorkingInformation from '@screens/myProfile/WorkingInformation';
import BankInformation from '@screens/myProfile/BankInformation';
import OfficialIdentification from '@screens/myProfile/OfficialIdentification';
import AboutSavvy from '@screens/aboutSavvy/AboutSavvy';
import Notifications from '@screens/notifications';
import GenerateCardVirtual from '@screens/myCards/GenerateCardVirtual';
import ConfirmCardVirtual from '@screens/myCards/ConfirmCardVirtual';
import MyVirtualCards from '@screens/myCards/MyVirtualCards';
import PasswordConfirmation from '@screens/forgotYourPassword/PasswordConfirmation';
import ListCryptoCurrency from '@screens/crypto/ListCryptoCurrency';
import buyCrypto from '@screens/crypto/buyCrypto/buyCrypto';
import buyForeignExchange from '@screens/crypto/buyCrypto/buyForeignExchange';
import MyCryptoBalance from '@screens/crypto/MyCryptoBalance';
import ConfirmationCrypto from '@screens/crypto/ConfirmationCrypto';
import CryptoSale from '@screens/crypto/cryptoSale/CryptoSale';
import SendCrypto from '@screens/crypto/sendCrypto/SendCrypto';
import ScanQRAddress from '@screens/crypto/sendCrypto/ScanQRAddress';
import ReceiveCrypto from '@screens/crypto/receiveCrypto/ReceiveCrypto';
import HistoricCrypto from '@screens/crypto/HistoricCrypto';
import RechargeCrypto from '@screens/crypto/rechargeCrypto/RechargeCrypto';
import RechargeOptions from '@screens/crypto/rechargeCrypto/RechargeOptions';
import WalletRecharge from '@screens/crypto/rechargeCrypto/WalletRecharge';
import RechargeConfirmation from '@screens/crypto/rechargeCrypto/RechargeConfirmation';
import SendOrTransferOptions from '@screens/crypto/SendOrTransferOptions';
import AddNewAddressCrypto from '@screens/crypto/sendCrypto/AddNewAddressCrypto';
import CryptoSendBetweenUser from '@screens/crypto/sendCrypto/sendCryptoUsers/CryptoSendBetweenUser';
import CryptoTransferUsers from '@screens/crypto/sendCrypto/sendCryptoUsers/CryptoTransferUsers';
import UpdateVirtualCard from '@screens/myCards/newVirtualCards/UpdateVirtualCard';
import ConfirmationUpdateCard from '@screens/myCards/newVirtualCards/ConfirmationUpdateCard';
import NewVirtualCards from '@screens/myCards/newVirtualCards';
import Auth2fa from '@screens/auth2fa';
import TwoFactorInstructions from '@screens/auth2fa/TwoFactorInstructions';
import TwoFactorActivation from '@screens/auth2fa/TwoFactorActivation';
import TwoFactorCodeActivation from '@screens/auth2fa/TwoFactorCodeActivation';
import TwoFactorConfirmationActivation from '@screens/auth2fa/TwoFactorConfirmationActivation';
import Auth2faSms from '@screens/auth2fa/auth2faSms';
import ActivationSms from '@screens/auth2fa/auth2faSms/ActivationSms';
import ConfirmationAuth from '@screens/auth2fa/ConfirmationAuth';
import Auth2faEmail from '@screens/auth2fa/auth2faEmail';
import ActivationEmail from '@screens/auth2fa/auth2faEmail/ActivationEmail';
import Auth2faApp from '@screens/auth2fa/auth2faApp';
import Pin2faConfirmation from '@screens/auth2fa/Pin2faConfirmation';
import Swap from '@screens/crypto/swap/HomeSwap';
import ListInformationSwap from '@screens/crypto/swap/ListInformationSwap';
import ConfirmationSwap from '@screens/crypto/swap/ConfirmationSwap';


export const signInScreens = {
  TabsMenu: {
    MyWallet: {
      screen: MyWallet,
    },
    MyCards: {
      screen: MyCards,
    },
    // Level: {
    //   screen: Level,
    // },
    // CreditsContracted: {
    //   screen: CreditsContracted,
    // },
    // Store: {
    //   screen: createStackNavigator(
    //     {
    //       Store                : Store,
    //       StoreCategory        : StoreCategory,
    //       ShoppingList         : ShoppingList,
    //       StoreProviderPayments: StoreProviderPayments
    //     },
    //     {
    //       headerMode      : 'none',
    //       initialRouteName: 'Store'
    //     }
    //   ),
    // }
  },
  signMenu: {
    Welcome: {
      screen           : Welcome,
      navigationOptions: {
        gesturesEnabled: false
      }
    },
    PaymentUsers: {
      screen           : PaymentUsers,
      navigationOptions: {
        gesturesEnabled: false
      }
    },
    PaymentToContacts: {
      screen           : PaymentToContacts,
      navigationOptions: {
        gesturesEnabled: false
      }
    },
    ContactInformation: {
      screen           : ContactInformation,
      navigationOptions: {
        gesturesEnabled: false
      }
    },
    PayConfirmation: {
      screen           : PayConfirmation,
      navigationOptions: {
        gesturesEnabled: false
      }
    },
    ReceivedInternationalPayments: {
      screen           : ReceivedInternationalPayments,
      navigationOptions: {
        gesturesEnabled: false
      }
    },
    RequestedInternationalPayments: {
      screen           : RequestedInternationalPayments,
      navigationOptions: {
        gesturesEnabled: false
      }
    },
    RequestInternationalPayment: {
      screen           : RequestInternationalPayment,
      navigationOptions: {
        gesturesEnabled: false
      }
    },
    ConfirmationRequestSend: {
      screen           : ConfirmationRequestSend,
      navigationOptions: {
        gesturesEnabled: false
      }
    },
    ReceivedPaymentAccepted: {
      screen           : ReceivedPaymentAccepted,
      navigationOptions: {
        gesturesEnabled: false
      }
    },
    ReceivedInternationalPayment: {
      screen           : ReceivedInternationalPayment,
      navigationOptions: {
        gesturesEnabled: false
      }
    },
    ReceivedQRPayment: {
      screen           : ReceivedQRPayment,
      navigationOptions: {
        gesturesEnabled: false
      }
    },
    ScanQR: {
      screen           : ScanQR,
      navigationOptions: {
        gesturesEnabled: false
      }
    },
    SearchByUserCode: {
      screen           : SearchByUserCode,
      navigationOptions: {
        gesturesEnabled: false
      }
    },
    Transfers: {
      screen           : Transfers,
      navigationOptions: {
        gesturesEnabled: false
      }
    },
    TransferWalletBank: {
      screen           : TransferWalletBank,
      navigationOptions: {
        gesturesEnabled: false
      }
    },
    TransferWalletBankSuccess: {
      screen           : TransferWalletBankSuccess,
      navigationOptions: {
        gesturesEnabled: false
      }
    },
    Historics: {
      screen           : Historics,
      navigationOptions: {
        gesturesEnabled: false
      }
    },
    EstablecimientosATM: {
      screen           : EstablecimientosATM,
      navigationOptions: {
        gesturesEnabled: false
      }
    },
    Recharges: {
      screen           : Recharges,
      navigationOptions: {
        gesturesEnabled: false
      }
    },
    RechargeSuccessful: {
      screen           : RechargeSuccessful,
      navigationOptions: {
        gesturesEnabled: false
      }
    },
    RechargesConfig: {
      screen           : RechargesConfig,
      navigationOptions: {
        gesturesEnabled: false
      }
    },
    RechargeCrypto: {
      screen           : RechargeCrypto,
      navigationOptions: {
        gesturesEnabled: false
      }
    },
    BankTransfer: {
      screen           : BankTransfer,
      navigationOptions: {
        gesturesEnabled: false
      }
    },
    MyCreditOptions: {
      screen           : MyCreditOptions,
      navigationOptions: {
        gesturesEnabled: false
      }
    },
    CreditAcceptance: {
      screen           : CreditAcceptance,
      navigationOptions: {
        gesturesEnabled: false
      }
    },
    CreditSuccessful: {
      screen           : CreditSuccessful,
      navigationOptions: {
        gesturesEnabled: false
      }
    },
    AppPin: {
      screen           : AppPin,
      navigationOptions: {
        gesturesEnabled: false
      }
    },
    ConfirmationPinUser: {
      screen           : ConfirmationPinUser,
      navigationOptions: {
        gesturesEnabled: false
      }
    },
    BiometricChangeConfirmation: {
      screen           : BiometricChangeConfirmation,
      navigationOptions: {
        gesturesEnabled: false
      }
    },
    AppNewPin: {
      screen           : AppNewPin,
      navigationOptions: {
        gesturesEnabled: false
      }
    },
    AppConfirmationPin: {
      screen           : AppConfirmationPin,
      navigationOptions: {
        gesturesEnabled: false
      }
    },
    BuyPoints: {
      screen           : BuyPoints,
      navigationOptions: {
        gesturesEnabled: false
      }
    },
    DetailBuyPoints: {
      screen           : DetailBuyPoints,
      navigationOptions: {
        gesturesEnabled: false
      }
    },
    ConfirmBuyPoints: {
      screen           : ConfirmBuyPoints,
      navigationOptions: {
        gesturesEnabled: false
      }
    },
    CompleteProfilCredits: {
      screen           : CompleteProfilCredits,
      navigationOptions: {
        gesturesEnabled: false
      }
    },
    CreditsContracted: {
      screen           : CreditsContracted,
      navigationOptions: {
        gesturesEnabled: false
      }
    },
    LevelsInfo: {
      screen           : LevelsInfo,
      navigationOptions: {
        gesturesEnabled: false
      }
    },
    ManualCreditPayment: {
      screen           : ManualCreditPayment,
      navigationOptions: {
        gesturesEnabled: false
      }
    },
    ManualCreditPaymentSuccessful: {
      screen           : ManualCreditPaymentSuccessful,
      navigationOptions: {
        gesturesEnabled: false
      }
    },
    ManualCreditPaymentTotalSuccessful: {
      screen           : ManualCreditPaymentTotalSuccessful,
      navigationOptions: {
        gesturesEnabled: false
      }
    },
    ViewCard: {
      screen           : ViewCard,
      navigationOptions: {
        gesturesEnabled: false
      }
    },
    NewVirtualCards: {
      screen           : NewVirtualCards,
      navigationOptions: {
        gesturesEnabled: false
      }
    },
    UpdateVirtualCard: {
      screen           : UpdateVirtualCard,
      navigationOptions: {
        gesturesEnabled: false
      }
    },
    ConfirmationUpdateCard: {
      screen           : ConfirmationUpdateCard,
      navigationOptions: {
        gesturesEnabled: false
      }
    },
    CloseOffers: {
      screen           : CloseOffers,
      navigationOptions: {
        gesturesEnabled: false
      }
    },
    StoreScanQR: {
      screen           : StoreScanQR,
      navigationOptions: {
        gesturesEnabled: false
      }
    },
    StoreShowQR: {
      screen           : StoreShowQR,
      navigationOptions: {
        gesturesEnabled: false
      }
    },
    StoreCaptureQR: {
      screen           : StoreCaptureQR,
      navigationOptions: {
        gesturesEnabled: false
      }
    },
    StoreConfirmation: {
      screen           : StoreConfirmation,
      navigationOptions: {
        gesturesEnabled: false
      }
    },
    StoreCashPurchase: {
      screen           : StoreCashPurchase,
      navigationOptions: {
        gesturesEnabled: false
      }
    },
    ConfirmationBuyStore: {
      screen           : ConfirmationBuyStore,
      navigationOptions: {
        gesturesEnabled: false
      }
    },
    ActivateCard: {
      screen           : ActivateCard,
      navigationOptions: {
        gesturesEnabled: false
      }
    },
    ActivateCardPin: {
      screen           : ActivateCardPin,
      navigationOptions: {
        gesturesEnabled: false
      }
    },
    ActivateCardConfirmation: {
      screen           : ActivateCardConfirmation,
      navigationOptions: {
        gesturesEnabled: false
      }
    },
    RechargeCard: {
      screen           : RechargeCard,
      navigationOptions: {
        gesturesEnabled: false
      }
    },
    RechargeCardConfirmation: {
      screen           : RechargeCardConfirmation,
      navigationOptions: {
        gesturesEnabled: false
      }
    },
    GenerateCardVirtual: {
      screen           : GenerateCardVirtual,
      navigationOptions: {
        gesturesEnabled: false
      }
    },
    ConfirmCardVirtual: {
      screen           : ConfirmCardVirtual,
      navigationOptions: {
        gesturesEnabled: false
      }
    },
    MyVirtualCards: {
      screen           : MyVirtualCards,
      navigationOptions: {
        gesturesEnabled: false
      }
    },
    CancelCard: {
      screen           : CancelCard,
      navigationOptions: {
        gesturesEnabled: false
      }
    },
    CancelCardCancel: {
      screen           : CancelCardCancel,
      navigationOptions: {
        gesturesEnabled: false
      }
    },
    CancelCardConfirmation: {
      screen           : CancelCardConfirmation,
      navigationOptions: {
        gesturesEnabled: false
      }
    },
    InfoReceivedCard: {
      screen           : InfoReceivedCard,
      navigationOptions: {
        gesturesEnabled: false
      }
    },
    PinUpdateScreen: {
      screen           : PinUpdateScreen,
      navigationOptions: {
        gesturesEnabled: false
      }
    },
    PinUpdateConfirmation: {
      screen           : PinUpdateConfirmation,
      navigationOptions: {
        gesturesEnabled: false
      }
    },
    ProviderPayment: {
      screen           : ProviderPayment,
      navigationOptions: {
        gesturesEnabled: false
      }
    },
    ProviderPaymentAmount: {
      screen           : ProviderPaymentAmount,
      navigationOptions: {
        gesturesEnabled: false
      }
    },
    ProviderPaymentSuccessful: {
      screen           : ProviderPaymentSuccessful,
      navigationOptions: {
        gesturesEnabled: false
      }
    },
    ProviderPaymentSaved: {
      screen           : ProviderPaymentSaved,
      navigationOptions: {
        gesturesEnabled: false
      }
    },
    GiftCardsList: {
      screen           : GiftCardsList,
      navigationOptions: {
        gesturesEnabled: false
      }
    },
    GiftCardDetails: {
      screen           : GiftCardDetails,
      navigationOptions: {
        gesturesEnabled: false
      }
    },
    GiftCardConfirmation: {
      screen           : GiftCardConfirmation,
      navigationOptions: {
        gesturesEnabled: false
      }
    },
    PurchasesSaved: {
      screen           : PurchasesSaved,
      navigationOptions: {
        gesturesEnabled: false
      }
    },
    GiftcardSavedDetail: {
      screen           : GiftcardSavedDetail,
      navigationOptions: {
        gesturesEnabled: false
      }
    },
    PurchaseSavedDetail: {
      screen           : PurchaseSavedDetail,
      navigationOptions: {
        gesturesEnabled: false
      }
    },
    MyProfile: {
      screen           : MyProfile,
      navigationOptions: {
        gesturesEnabled: false
      }
    },
    PersonalInformation: {
      screen           : PersonalInformation,
      navigationOptions: {
        gesturesEnabled: false
      }
    },
    ContactInformationProfile: {
      screen           : ContactInformationProfile,
      navigationOptions: {
        gesturesEnabled: false
      }
    },
    WorkingInformation: {
      screen           : WorkingInformation,
      navigationOptions: {
        gesturesEnabled: false
      }
    },
    BankInformation: {
      screen           : BankInformation,
      navigationOptions: {
        gesturesEnabled: false
      }
    },
    OfficialIdentification: {
      screen           : OfficialIdentification,
      navigationOptions: {
        gesturesEnabled: false
      }
    },
    Configuration: {
      screen           : Configuration,
      navigationOptions: {
        gesturesEnabled: false
      }
    },
    Contact: {
      screen           : Contact,
      navigationOptions: {
        gesturesEnabled: false
      }
    },
    ContactSuccessful: {
      screen           : ContactSuccessful,
      navigationOptions: {
        gesturesEnabled: false
      }
    },
    AboutSavvy: {
      screen           : AboutSavvy,
      navigationOptions: {
        gesturesEnabled: false
      }
    },
    paymentToEstablishment: {
      screen           : paymentToEstablishment,
      navigationOptions: {
        gesturesEnabled: false
      }
    },
    confirmationEstablishment: {
      screen           : confirmationEstablishment,
      navigationOptions: {
        gesturesEnabled: false
      }
    },
    Notifications: {
      screen           : Notifications,
      navigationOptions: {
        gesturesEnabled: false
      }
    },
    ScanQrReceived: {
      screen           : ScanQrReceived,
      navigationOptions: {
        gesturesEnabled: false
      }
    },
    RechargeReceivedSuccessful: {
      screen           : RechargeReceivedSuccessful,
      navigationOptions: {
        gesturesEnabled: false
      }
    },
    RequestCard: {
      screen           : RequestCard,
      navigationOptions: {
        gesturesEnabled: false
      }
    },
    ConfirmationRequestCard: {
      screen           : ConfirmationRequestCard,
      navigationOptions: {
        gesturesEnabled: false
      }
    },
    ListCryptoCurrency: {
      screen           : ListCryptoCurrency,
      navigationOptions: {
        gesturesEnabled: false
      }
    },
    buyCrypto: {
      screen           : buyCrypto,
      navigationOptions: {
        gesturesEnabled: false
      }
    },
    buyForeignExchange: {
      screen           : buyForeignExchange,
      navigationOptions: {
        gesturesEnabled: false
      }
    },
    MyCryptoBalance: {
      screen           : MyCryptoBalance,
      navigationOptions: {
        gesturesEnabled: false
      }
    },
    RechargeOptions: {
      screen           : RechargeOptions,
      navigationOptions: {
        gesturesEnabled: false
      }
    },
    ConfirmationCrypto: {
      screen           : ConfirmationCrypto,
      navigationOptions: {
        gesturesEnabled: false
      }
    },
    CryptoSale: {
      screen           : CryptoSale,
      navigationOptions: {
        gesturesEnabled: false
      }
    },
    SendCrypto: {
      screen           : SendCrypto,
      navigationOptions: {
        gesturesEnabled: false
      }
    },
    ScanQRAddress: {
      screen           : ScanQRAddress,
      navigationOptions: {
        gesturesEnabled: false
      }
    },
    ReceiveCrypto: {
      screen           : ReceiveCrypto,
      navigationOptions: {
        gesturesEnabled: false
      }
    },
    HistoricCrypto: {
      screen           : HistoricCrypto,
      navigationOptions: {
        gesturesEnabled: false
      }
    },
    WalletRecharge: {
      screen           : WalletRecharge,
      navigationOptions: {
        gesturesEnabled: false
      }
    },
    RechargeConfirmation: {
      screen           : RechargeConfirmation,
      navigationOptions: {
        gesturesEnabled: false
      }
    },
    SendOrTransferOptions: {
      screen           : SendOrTransferOptions,
      navigationOptions: {
        gesturesEnabled: false
      }
    },
    AddNewAddressCrypto: {
      screen           : AddNewAddressCrypto,
      navigationOptions: {
        gesturesEnabled: false
      }
    },
    CryptoSendBetweenUser: {
      screen           : CryptoSendBetweenUser,
      navigationOptions: {
        gesturesEnabled: false
      }
    },
    CryptoTransferUsers: {
      screen           : CryptoTransferUsers,
      navigationOptions: {
        gesturesEnabled: false
      }
    },
    Auth2fa: {
      screen           : Auth2fa,
      navigationOptions: {
        gesturesEnabled: false
      }
    },
    ListInformationSwap: {
      screen           : ListInformationSwap,
      navigationOptions: {
        gesturesEnabled: false
      }
    },
 
    ConfirmationSwap: {
      screen           : ConfirmationSwap,
      navigationOptions: {
        gesturesEnabled: false
      }
    },

    TwoFactorActivation:{
      screen           : TwoFactorActivation,
      navigationOptions: {
        gesturesEnabled: false
      }
    },
    Swap: {
      screen           : Swap,
      navigationOptions: {
        gesturesEnabled: false
      }
    },
    Auth2fa: {
      screen           : Auth2fa,
      navigationOptions: {
        gesturesEnabled: false
      }
    },
    TwoFactorCodeActivation:{
      screen           : TwoFactorCodeActivation,
      navigationOptions: {
        gesturesEnabled: false
      }
    },
    TwoFactorConfirmationActivation:{
      screen           : TwoFactorConfirmationActivation,
      navigationOptions: {
        gesturesEnabled: false
      }
    },
    Auth2faSms:{
      screen           : Auth2faSms,
      navigationOptions: {
        gesturesEnabled: false
      }
    },
    ActivationSms:{
      screen           : ActivationSms,
      navigationOptions: {
        gesturesEnabled: false
      }
    },
    ConfirmationAuth:{
      screen           : ConfirmationAuth,
      navigationOptions: {
        gesturesEnabled: false
      }
    },
    Auth2faEmail:{
      screen           : Auth2faEmail,
      navigationOptions: {
        gesturesEnabled: false
      }
    },
    ActivationEmail:{
      screen           : ActivationEmail,
      navigationOptions: {
        gesturesEnabled: false
      }
    },
    Auth2faApp:{
      screen           : Auth2faApp,
      navigationOptions: {
        gesturesEnabled: false
      }
    },
    Pin2faConfirmation : {
      screen           : Pin2faConfirmation,
      navigationOptions: {
        gesturesEnabled: false
      }
    },
  },
};

export const signOutScreens = {
  Welcome: {
    screen           : Welcome,
    navigationOptions: {
      gesturesEnabled: false
    }
  },
  SignUp: {
    screen           : SignUp,
    navigationOptions: {
      gesturesEnabled: false
    }
  },
  Register: {
    screen           : Register,
    navigationOptions: {
      gesturesEnabled: false
    }
  },
  CompanyCode: {
    screen           : CompanyCode,
    navigationOptions: {
      gesturesEnabled: false
    }
  },
  RequestCompanyCode: {
    screen           : RequestCompanyCode,
    navigationOptions: {
      gesturesEnabled: false
    }
  },
  ConfirmSMS: {
    screen           : ConfirmSMS,
    navigationOptions: {
      gesturesEnabled: false
    }
  },
  CreatePassword: {
    screen           : CreatePassword,
    navigationOptions: {
      gesturesEnabled: false
    }
  },
  Login: {
    screen           : Login,
    navigationOptions: {
      gesturesEnabled: false
    }
  },
  WelcomeNew: {
    screen           : WelcomeNew,
    navigationOptions: {
      gesturesEnabled: false
    }
  },
  SelectCompany: {
    screen           : SelectCompany,
    navigationOptions: {
      gesturesEnabled: false
    }
  },
  initRegisterProfile: {
    screen           : initRegisterProfile,
    navigationOptions: {
      gesturesEnabled: false
    }
  },
  onboarStepOne: {
    screen           : onboarStepOne,
    navigationOptions: {
      gesturesEnabled: false
    }
  },
  onboarStepTwo: {
    screen           : onboarStepTwo,
    navigationOptions: {
      gesturesEnabled: false
    }
  },
  onboarStepThree: {
    screen           : onboarStepThree,
    navigationOptions: {
      gesturesEnabled: false
    }
  },
  forgotSecretAnswer: {
    screen           : forgotSecretAnswer,
    navigationOptions: {
      gesturesEnabled: false
    }
  },
  PasswordConfirmation: {
    screen           : PasswordConfirmation,
    navigationOptions: {
      gesturesEnabled: false
    }
  },
  InformationPersonal: {
    screen           : InformationPersonal,
    navigationOptions: {
      gesturesEnabled: false
    }
  },
  TransBalanceConfirm: {
    screen           : TransBalanceConfirm,
    navigationOptions: {
      gesturesEnabled: false
    }
  },
  Auth2fa: {
    screen           : Auth2fa,
    navigationOptions: {
      gesturesEnabled: false
    }
  },
  TwoFactorInstructions: {
    screen           : TwoFactorInstructions,
    navigationOptions: {
      gesturesEnabled: false
    }
  },
  TwoFactorActivation:{
    screen           : TwoFactorActivation,
    navigationOptions: {
      gesturesEnabled: false
    }
  },
  TwoFactorCodeActivation:{
    screen           : TwoFactorCodeActivation,
    navigationOptions: {
      gesturesEnabled: false
    }
  },
  TwoFactorConfirmationActivation:{
    screen           : TwoFactorConfirmationActivation,
    navigationOptions: {
      gesturesEnabled: false
    }
  },
  Auth2faSms:{
    screen           : Auth2faSms,
    navigationOptions: {
      gesturesEnabled: false
    }
  },
  ActivationSms:{
    screen           : ActivationSms,
    navigationOptions: {
      gesturesEnabled: false
    }
  },
  ConfirmationAuth:{
    screen           : ConfirmationAuth,
    navigationOptions: {
      gesturesEnabled: false
    }
  },
  Auth2faEmail:{
    screen           : Auth2faEmail,
    navigationOptions: {
      gesturesEnabled: false
    }
  },
  ActivationEmail:{
    screen           : ActivationEmail,
    navigationOptions: {
      gesturesEnabled: false
    }
  },
  Auth2faApp:{
    screen           : Auth2faApp,
    navigationOptions: {
      gesturesEnabled: false
    }
  },
  Pin2faConfirmation : {
    screen           : Pin2faConfirmation,
    navigationOptions: {
      gesturesEnabled: false
    }
  },
};
