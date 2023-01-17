import React, { Fragment, useEffect, useState } from 'react';
import {
    Text,
    View,
    DivSpace,
    ImageComponent
} from '@components';
import { TouchableOpacity, PermissionsAndroid } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { useSelector, useDispatch } from 'react-redux';
import TextInputError from '@components/AnimateLabelInput/TextInputError';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { cleanDataFile, setFileAddress, setFileBack, setFileFront, setFileSelfie } from '../../store/actions/userGraph.actions';
import { convertImage } from '@utils/formatters';
import Styles from './styles';
import i18n from '@utils/i18n';
import Colors from '@styles/Colors';
import { createKYC, editKYC } from '../../store/actions/profile.actions';

const options = {
    title: 'Choose an Image',
    includeBase64: true
};

const optionsCamera = {
    title: 'Capture Photo',
    cancelButtonTitle: 'Cancel',
    takePhotoButtonTitle: 'Capture Photo',
    includeBase64: true
};


const ImageUploadPiker = ({ value, error, onChangeText, navigation, label, ImageEmpty, typeImage, onfillLoading, ...props }) => {
    const dispatch = useDispatch();
    const redux = useSelector(state => state);
    const userData = redux?.user;
    const userGraph = redux?.userGraph;
    const profileData = redux.profile;
    const brandTheme = userData?.Theme?.colors;
    const userProfile = userGraph?.dataUser?.usersProfile ? userGraph?.dataUser?.usersProfile[0] : '';
    const userInfo = userProfile ? userProfile?.accounts : '';
    const kyc = userInfo?.kyc ? userInfo?.kyc[0] : '';
    const [fileError, setFileError] = useState('pending');
    const [typeImagesSend, setTypeImagesSend] = useState('');
    const [showFront, setShowFront] = useState(false);
    const [showBack, setShowBack] = useState(false);
    const [showAddress, setShowAddress] = useState(false);
    const [showSelfie, setShowSelfie] = useState(false);
    const errorFile = useSelector(state => state?.userGraph?.showErrorFile);

    useEffect(() => {
        dispatch(cleanDataFile());
    }, [])

    useEffect(() => {
        setFileError(fileError)
        onchangeSendImage();
    }, [fileError, userGraph])



    function onchangeSendImage() {
        if (typeImagesSend === 'front') {
            onChangeText(userGraph?.fileFront ?? '');
            setShowFront(userGraph?.successFileFront);
        } else if (typeImagesSend === 'back') {
            onChangeText(userGraph?.fileBack ?? '');
            setShowBack(userGraph?.successFileBack);
        } else if (typeImagesSend === 'address') {
            onChangeText(userGraph?.fileAddress ?? '');
            setShowAddress(userGraph?.successFileAddress);
        } else if (typeImagesSend === 'selfie') {
            onChangeText(userGraph?.fileSelfie ?? '');
            setShowSelfie(userGraph?.successFileSelfie);
        }
    }
    //console.log('showFront',showFront,userGraph?.successFileFront)



    useEffect(() => {
        if (showFront) {
            getUpdateAddress();
        }
    }, [showFront])

    useEffect(() => {
        if (showBack) {
            getUpdateAddress();
        }
    }, [showBack])


    useEffect(() => {
        if (showAddress) {
            getUpdateAddress();
        }
    }, [showAddress])


    useEffect(() => {
        if (showSelfie) {
            getUpdateAddress();
        }
    }, [showSelfie])

    const uploadImage = async (fileBase64, nameFile, typeImage) => {
        const resultBase = await convertImage(fileBase64?.uri);
        setTypeImagesSend(typeImage);
        switch (typeImage) {
            case 'front':
                dispatch(setFileFront({ nameFile, resultBase }));
                setFileError(null);
                break;
            case 'back':
                dispatch(setFileBack({ nameFile, resultBase }));
                setFileError(null);
                break;
            case 'address':
                dispatch(setFileAddress({ nameFile, resultBase }));
                setFileError(null);
                break;
            case 'selfie':
                dispatch(setFileSelfie({ nameFile, resultBase }))
                setFileError(null);
                break;
            default:
                return typeImage;
        }
        if (errorFile) {
            setFileError('Image rejected, please retake it.');
        }
    };

    //   console.log('userInfo?.kyc',userInfo?.kyc, userGraph)
    function getUpdateAddress() {
        const valueFront = userGraph?.fileFront ? userGraph?.fileFront : kyc?.frontId;
        const valueBack = userGraph?.fileBack ? userGraph?.fileBack : kyc?.backId;
        const valueFaceId = userGraph?.fileSelfie ? userGraph?.fileSelfie : kyc?.faceId;
        const valueDocumentId = userGraph?.fileAddress ? userGraph?.fileAddress : kyc?.documentId;
        const valueTypeIdent = kyc?.typeIdentification ? kyc?.typeIdentification : '';
        const isComplete = (valueFront ? true : false) && (valueBack ? true : false) && (valueFaceId ? true : false) && (valueDocumentId ? true : false) && (valueTypeIdent ? true : false);

        if (userInfo?.kyc?.length > 0) {
            const dataUpdateKYC = {
                id: kyc?.id ?? "",
                accountId: userProfile?.accountId ?? "",
                frontId: valueFront ?? "",
                backId: valueBack ?? "",
                faceId: valueFaceId ?? "",
                typeIdentification: valueTypeIdent ?? "",
                documentId: valueDocumentId ?? "",
                kycid: kyc?.kycid ?? "0",
                isComplete: isComplete,
                ip: ''
            }
            dispatch(editKYC({ dataUpdateKYC }))
        } else {

            const dataCreateKYC = {
                accountId: userProfile?.accountId ?? "",
                frontId: valueFront ?? "",
                backId: valueBack ?? "",
                faceId: valueFaceId ?? "",
                typeIdentification: valueTypeIdent ?? "",
                documentId: valueDocumentId ?? "",
                status: "0",
                kycid: kyc?.kycid ?? "0",
                isComplete: isComplete,
                ip: ''
            }
            dispatch(createKYC({ dataCreateKYC }))
        }
    }


    function handleImages(valueImage) {
        launchImageLibrary(options, async (response) => {
            const { error, uri, data } = response;
            if (response.didCancel) {
                // console.log('User cancelled image picker');
            }
            else if (error) {
                // console.log('error', error)
                setFileError(response.error);
            } else if (response.customButton) {
                // console.log('User tapped custom button:', response.customButton);
            } else {
                if (data) {
                    const source = { uri: 'data:image/jpeg;base64,' + data }
                    const nameFile = Math.random() + response?.fileName;
                    uploadImage(source, nameFile, valueImage);
                } else {
                    setFileError('Image rejected, please retake it.');
                }
            }
        });
    }

    async function handleImagesSelfie(valueImage) {
        const grantedcamera = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA,
            {
                title: "App Camera Permission",
                message: "App needs access to your camera ",
                buttonNeutral: "Ask Me Later",
                buttonNegative: "Cancel",
                buttonPositive: "OK"
            }
        );
        if (grantedcamera === PermissionsAndroid.RESULTS.GRANTED) {
            console.log("Camera & storage permission given");
        }
        launchCamera(optionsCamera, (response) => {
            const { error, uri, data } = response;
            if (response.didCancel) {
                console.log('User cancelled image picker');
            }
            else if (error) {
                console.log('error', error)
                setFileError(response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button:', response.customButton);
            } else {
                const nameFiles = response?.uri?.slice(response?.uri?.lastIndexOf('/') + 1);

                if (data) {
                    const source = { uri: 'data:image/jpeg;base64,' + data }
                    const nameFile = Math.random() + nameFiles;
                    uploadImage(source, nameFile, valueImage);
                } else {
                    setFileError('Image rejected, please retake it.');
                }
            }
        });
    }



    return (
        <Fragment>
            <TouchableOpacity onPress={() => typeImage === 'selfie' ? handleImagesSelfie(typeImage) : handleImages(typeImage)}>
                <Animatable.View animation="fadeIn" delay={300}>
                    <View flex-1 centerH centerV height-160 textBlue01 style={fileError === 'pending' ? { borderColor: brandTheme?.textBlue01 ?? Colors.textBlue01, borderWidth: 1 } : fileError ? { borderColor: brandTheme?.red ?? Colors.red, borderWidth: 1 } : { borderColor: brandTheme?.green ?? Colors.green, borderWidth: 1 }}>
                        {(value !== '') && (
                            <ImageComponent
                                source={{ uri: value }}
                                width={'90%'}
                                height={'90%'}
                            />
                        )}
                        {value === '' && (
                            <ImageComponent
                                source={ImageEmpty}
                                width={'90%'}
                                height={'90%'}
                            />
                        )}

                        {value === undefined && (
                            <ImageComponent
                                source={ImageEmpty}
                                width={'90%'}
                                height={'90%'}
                            />
                        )}

                    </View>
                    <View textBlueDark centerH centerV height-20 style={Styles.containerBottomId}>
                        <Text h10 white semibold>
                            {label}
                        </Text>
                    </View>
                </Animatable.View>
            </TouchableOpacity>
            <DivSpace width-5 />
            {fileError !== 'pending' && (<TextInputError error={fileError} />)}
        </Fragment>

    );
}


export default ImageUploadPiker;