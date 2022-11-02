import i18n from '@utils/i18n';
import { AsyncStorage } from 'react-native';


export let Validations;

(async () => {
  const lang = await AsyncStorage.getItem('lang');
  Validations = await downloadedText();
})();

async function downloadedText() {
  
  const Valid ={
    country: {
      presence: {
        message: i18n.t('validations.countryPresence')
      }
    },
    concept: {
      presence: {
        message: i18n.t('validations.conceptPresence')
      }
    },
    code: {
      presence: {
        message: i18n.t('validations.conceptPresence')
      }
    },
    name: {
      presence: {
        message: i18n.t('validations.namePresence')
      },
      format: {
        pattern: /^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]+$/,
        message: i18n.t('validations.nameFormat')
      }
    },
    lastName: {
      presence: {
        message: i18n.t('validations.lastNamePresence')
      },
      format: {
        pattern: /^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]+$/,
        message: i18n.t('validations.nameFormat')
      }
    },
    answerS: {
      presence: {
        message: i18n.t('validations.answerSPresence')
      },
      format: {
        pattern: /^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]+$/,
        message: i18n.t('validations.nameFormat')
      }
    },

    slastName: {
      presence: {
        message: i18n.t('validations.slastNamePresence')
      },
      format: {
        pattern: /^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]+$/,
        message: i18n.t('validations.nameFormat')
      }
    },
    email: {
      presence: {
        message: i18n.t('validations.emailPresence')
      },

      format: {
        pattern: /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i,
        message: i18n.t('validations.emailFormat')
      }
    },
    emailOrPhone: {
      presence: {
        message: i18n.t('validations.emailOrPhonePresence')
      }
    },
    curp: {
      presence: {
        message: i18n.t('validations.curpPresence')
      },
    },
    loginPassword: {
      presence: {
        message: i18n.t('validations.passwordPresence')
      }
    },

    password: {
      presence: {
        message: i18n.t('validations.passwordPresence')
      },
      length: {
        minimum: 8,
        maximum: 25,
        message: i18n.t('validations.passwordLength')
      },
      format: {
        pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/,
        message: i18n.t('validations.passwordFormat')
      }
    },

    confirmPassword: {
      presence: {
        message: i18n.t('validations.passwordPresence')
      },
      equality: {
        message: i18n.t('validations.passwordEquality')
      }
    },

    phone: {
      presence: {
        message: i18n.t('validations.phonePresence')
      }
    },

    securityAnswer: {
      presence: {
        message: i18n.t('validations.securityAnswerPresence')
      }
    },

    pinCode: {
      presence: {
        message: 'pin code'
      },
      format: {
        pattern: /^[0-9]{6}$/,
        message: i18n.t('validations.pinCode')
      }
    },

    reference: {
      presence: {
        message: 'Please enter reference'
      }
    },

    amount: {
      presence: {
        message: i18n.t('validations.amountPresence')
      }
    },
    street: {
      presence: {
        message: i18n.t('validations.street')
      }
    },
    number: {
      presence: {
        message: i18n.t('validations.number')
      },
      length: {
        minimum: 6,
        maximum: 6,
        message: i18n.t('validations.codeLength')
      },
    },
    city: {
      presence: {
        message: i18n.t('validations.city')
      }
    },
    state: {
      presence: {
        message: i18n.t('validations.state')
      }
    },
    zipCode: {
      presence: {
        message: i18n.t('validations.zipCode')
      },
      length: {
        minimum: 6,
        maximum: 10
      }
    },
    clientNumber: {
      presence: {
        message: i18n.t('validations.clabe')
      },
      length: {
        minimum: 20,
        maximum: 20
      }
    },
    routingNumber: {
      presence: {
        message: i18n.t('validations.routing')
      },
      length: {
        minimum: 20,
        maximum: 20
      }
    },
    datum1: {
      presence: {
        message: i18n.t('validations.answerSPresence')
      }
    },
    datum2: {
      presence: {
        message: i18n.t('validations.answerSPresence')
      }
    },
    datum3: {
      presence: {
        message: i18n.t('validations.answerSPresence')
      }
    },
    suburb: {
      presence: {
        message: i18n.t('validations.suburb')
      }
    },
    postalCode: {
      presence: {
        message: i18n.t('validations.postalCode')
      }
    },
    codeConfirm: {
      presence: {
        message: i18n.t('validations.confirmCode')
      }
    },
    accountNo: {
      presence: {
        message: i18n.t('validations.accountNo')
      }
    },
    interbankClabe: {
      presence: {
        message: i18n.t('validations.interbankClabe')
      }
    },
    cardNumber: {
      presence: {
        message: i18n.t('validations.cardNumber')
      },
      length: {
        minimum: 16,
        maximum: 16,
        message: i18n.t('validations.cardNumberLength')
      }
    },
    cardExpiration: {
      presence: {
        message: i18n.t('validations.cardExpiration')
      }
    },
    cardCVV: {
      presence: {
        message: i18n.t('validations.cardCVV')
      }
    },
    cardNip: {
      presence: {
        message: i18n.t('validations.Nip')
      }
    },
    cardNipConfirmation: {
      presence: {
        message: i18n.t('validations.NipConfirmation')
      },
      equality: {
        message: i18n.t('validations.nipEquality')
      }
    },
    securityQ: {
      presence: {
        message: i18n.t('validations.securityQuestion')
      }
    },
    accepTerms: {
      presence: {
        message: i18n.t('validations.accepTermandConditions')
      }
    },
    rfc: {
      presence: {
        message: i18n.t('validations.rfcPresence')
      }
    },
    delegation: {
      presence: {
        message: i18n.t('validations.delegationPresence')
      }
    },
    messageOption: {
      presence: {
        message: i18n.t('validations.message')
      }
    },
    dropDownTiket: {
      presence: {
        message: i18n.t('validations.dropdownSelect')
      }
    },
    dropdownOrigin: {
      presence: {
        message: i18n.t('validations.dropdownOrigin')
      }
    },
    dropdownDestiny: {
      presence: {
        message: i18n.t('validations.dropdownDestiny')
      }
    },
    typeIdentif: {
      presence: {
        message: i18n.t('validations.dropdownTypeIdentify')
      }
    },  
    dropdownBank: {
      presence: {
        message: i18n.t('validations.dropdownBank')
      }
    },
    idTransaction: {
      presence: {
        message: i18n.t('validations.idTransaction')
      }
    },
    dropdownSelect: {
      presence: {
        message: i18n.t('validations.dropdownSelect')
      }
    },
  };
  return Valid;
}
 


