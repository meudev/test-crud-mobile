import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import AwesomeAlert from 'react-native-awesome-alerts';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';

import { theme } from '../../theme';

interface ShowAlertProps {
    data: {
        title: string;
        message: string;
        type: "alert" | "confirmation";
        active: boolean;
        confirmText: string;
        cancelText?: string;
        handleConfirm: () => void;
    }
}

function Alert({ data }: ShowAlertProps) {
    const [showAlertActive, setShowAlertActive] = useState(false);

    useEffect(() => {
        if(data.active) {
            setShowAlertActive(true)
        } else {
            setShowAlertActive(false)
        }
    },[data])

    return (
        <AwesomeAlert
            show={showAlertActive}
            showProgress={false}
            title={data.title}
            message={data.message}
            closeOnTouchOutside={true}
            closeOnHardwareBackPress={false}
            confirmButtonColor={theme.colors.brand}
            onCancelPressed={() => setShowAlertActive(false)}
            contentContainerStyle={[styles.container, theme.shadowProp]}
            titleStyle={styles.title}
            messageStyle={styles.message}
            showCancelButton={data.type === 'confirmation' && true}
            cancelText={data.cancelText}
            cancelButtonStyle={styles.cancelButton}
            cancelButtonTextStyle={styles.cancelText}
            showConfirmButton={true}
            confirmText={data.confirmText}
            onConfirmPressed={data.handleConfirm}
            confirmButtonStyle={styles.confirmButton}
            confirmButtonTextStyle={styles.confirmText}
        />

    );
}

const styles = StyleSheet.create({
    container: {
        width: RFPercentage(90),
        minHeight: RFValue(100),
        padding: 20,
    },
    title: {
        fontWeight: '900',
        fontSize: RFValue(18),
    },
    message: {
        fontSize: RFValue(12),
    },
    cancelButton: {
        minWidth: 100,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: theme.colors.primary,
        backgroundColor: theme.colors.neutral
    },
    cancelText: {
        fontSize: RFValue(12),
        color: theme.colors.input_secondary
    },
    confirmButton: {
        minWidth: 100,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: theme.colors.primary,
        backgroundColor: theme.colors.primary
    },
    confirmText: {
        fontSize: RFValue(12),
        color: theme.colors.neutral,
    },
});

export { Alert, ShowAlertProps };