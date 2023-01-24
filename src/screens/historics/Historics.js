import React, { useRef, useState, useEffect, useCallback } from 'react';
import { moneyFormatter } from '@utils/formatters';
import EmptyState from '@screens/EmptyState';
import { ScrollView, TouchableOpacity, RefreshControl } from 'react-native';
import { getHistoriTransactions, getHistoriId } from '@utils/api/switch';

import {
    Text,
    View,
    Loader,
    DivSpace,
    NavigationBar,
    ButtonFloating
} from '@components';
import LocalStorage from '@utils/localStorage';
import i18n from '@utils/i18n';
import SignUpWrapper from '@screens/signUp/components/SignUpWrapper';
import Styles from '@screens/historics/styles';
import { useSelector } from 'react-redux';
import Colors from '@styles/Colors';
import { getOrderAccountTransactions } from '../../utils/api/graph_api/cards.service';
import { getFirstDayYear, getFirstDayYearhNow, getLastDayMonthNow } from '../../utils/tools/date.tools';
import { getAccountTransactionsByDate } from '../../utils/api/graph_api/wallet.services';

const Historic = ({
    transactionDate,
    amount,
    currencyCode,
    note,
    authorization,
    source,
    type,
    theme
}) => {
    const [isOpen, setIsOpen] = useState(false);


    function handlePress() {
        setIsOpen(!isOpen);
    }
    return (
        <TouchableOpacity onPress={handlePress}>
            <View
                style={isOpen ? [Styles.opened, { backgroundColor: theme?.textBlueDark ?? Colors.textBlueDark }] : [Styles.closed, { backgroundColor: theme?.textBlue01 ?? Colors.textBlue01 }]}
                centerV
                marginB-10
                paddingH-9
            >
                <View paddingV-9>
                    <Text white h10>
                        {transactionDate}
                    </Text>
                    <View flex-1 row>
                        <View flex-3>
                            <Text white h10 medium numberOfLines={1}>
                                {note}
                            </Text>
                        </View>
                        <View flex-1 right>
                            <Text
                                {...(type !== 1 ? { white: true } : { green: true })}
                                h10
                                semibold
                                center
                            >
                                {moneyFormatter(amount)}{' '}{currencyCode}
                            </Text>
                        </View>
                    </View>
                    {isOpen && (
                        <>
                            <DivSpace height-8 />
                            <View bgBlue02 style={[Styles.DivSpace]} />
                            <DivSpace height-8 />
                            <Text h10 white>
                                {i18n.t('historics.component.transaction')}
                            </Text>
                            <Text white h10 medium>
                                {type === 1 ? i18n.t('historics.component.textdeposit') : i18n.t('historics.component.textcharge')}
                            </Text>
                            <DivSpace height-5 />
                        </>
                    )}
                </View>
            </View>
        </TouchableOpacity>
    );
};

const Historics = ({ navigation }) => {
    var userGraphInfo = null;
    const redux = useSelector(state => state);
    const appData = redux.user;
    const brandTheme = appData?.Theme?.colors;
    const scrollView = useRef(null);
    const [refreshing, setRefreshing] = useState(false);
    const [isLoadingModal, setIsLoadingModal] = useState(false);
    const page = navigation.getParam('page');
    const data = navigation.getParam('dataBackup');
    const [historicTrans, setHistoricTrans] = useState([]);
    const [showData, setShowData] = useState(false);

    useEffect(() => {
        getUserInfo();

    }, []);

    async function getUserInfo() {
        userGraphInfo = JSON.parse(await LocalStorage.get('user_info_graph'));
        console.log('get user info transactions', userGraphInfo);
        page !== 'card' ? getInfo() : getIdInfo();
    }

    async function getInfo() {


        setIsLoadingModal(true);

        let startDate = getFirstDayYear(new Date(2022, 1, 1));

        let endDate = getLastDayMonthNow();



        // const token = await LocalStorage.get('auth_token');
        // const proxy = data ? data?.id : '';
        // const response = await getHistoriId(token, proxy);
        const response = await getAccountTransactionsByDate(userGraphInfo?.clients?.account?.id, 0, startDate, endDate);


        if (response?.getAccountTransactionsByDate) {
            setShowData(true);
            let transactions = response?.getAccountTransactionsByDate;
            let transactions_state = [];

            transactions.forEach(transaction => {
                transactions_state.push({
                    transactionDate: transaction?.createdDate,
                    amount: transaction?.amount,
                    currencyCode: 'USD',
                    note: transaction?.note?.noteDescription,
                    authorization: transaction?.createdDate,
                    source: '',
                    type: transaction?.type
                })
            });

            console.log('transactions wallet', transactions_state);
            const orderABC = transactions_state.sort((a, b) => a.transactionDate.localeCompare(b.transactionDate));
            setHistoricTrans(orderABC.reverse());
            setIsLoadingModal(false);

        } else {
            setHistoricTrans([]);
            setShowData(false);
            setIsLoadingModal(false);
        }
    }




    async function getIdInfo() {


        setIsLoadingModal(true);

        let startDate = getFirstDayYear(new Date(2022, 1, 1));

        let endDate = getLastDayMonthNow();



        // const token = await LocalStorage.get('auth_token');
        // const proxy = data ? data?.id : '';
        // const response = await getHistoriId(token, proxy);
        const response = await getOrderAccountTransactions(data?.id, 1, 100, startDate, endDate);

        console.log('getIdInfo response', response);

        if (response?.getOrderAccountTransactions) {
            setShowData(true);
            let transactions = response?.getOrderAccountTransactions;
            let transactions_state = [];

            transactions.forEach(transaction => {
                transactions_state.push({
                    transactionDate: transaction?.date,
                    amount: transaction?.amount,
                    currencyCode: 'USD',
                    note: transaction?.description,
                    authorization: transaction?.date,
                    source: '',
                    type: transaction?.type
                })
            });

            const orderABC = transactions_state.sort((a, b) => a.transactionDate.localeCompare(b.transactionDate));
            setHistoricTrans(orderABC.reverse());
            setIsLoadingModal(false);

        } else {
            setHistoricTrans([]);
            setShowData(false);
            setIsLoadingModal(false);
        }


        if (response.code < 400) {
            if (!response.data) {
                setHistoricTrans([]);
                setShowData(false);
                setIsLoadingModal(false);
            } else {
                setShowData(true);
                const orderABC = response.data ? response.data.sort((a, b) => a.transactionDate.localeCompare(b.transactionDate)) : '';
                setHistoricTrans(orderABC ? orderABC.reverse() : []);
                setIsLoadingModal(false);
            }
        } else {
            setIsLoadingModal(false);
        }
    }

    const handleGoUpPress = () =>
        scrollView.current.scrollTo({ x: 0, y: 0, animated: true });

    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        getInfo();
    }, [refreshing]);


    return (
        <SignUpWrapper>
            <NavigationBar
                disableExtraTop
                onBack={() => navigation.goBack()}
                body={i18n.t('historics.component.title')}
                onClose={null}
            />
            <DivSpace height-15 />
            {historicTrans.length <= 0 && showData && (
                <EmptyState navigation={navigation} />
            )}
            <View flex-1 centerH>
                <ScrollView ref={scrollView} style={Styles.scroll}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                            tintColor={brandTheme?.white ?? Colors.white}
                        />
                    }>

                    {historicTrans.length > 0 && (
                        historicTrans.map((datum, index) => (
                            <Historic {...datum} key={index} theme={brandTheme} />
                        ))
                    )}
                    <DivSpace height-35 />
                </ScrollView>
            </View>
            {historicTrans.length > 0 && (
                <View centerH style={Styles.viewBtnFloating}>
                    <ButtonFloating onPress={handleGoUpPress} />
                </View>
            )}
            <DivSpace height-18 />
            {isLoadingModal && (
                <Loader
                    isOpen={true}
                    navigation={navigation} />)}
        </SignUpWrapper>
    );
};

export default Historics;
