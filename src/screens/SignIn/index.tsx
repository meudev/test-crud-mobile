import React, { useCallback, useMemo, useRef, useState } from 'react';
import { Keyboard, KeyboardAvoidingView, Platform, TouchableWithoutFeedback } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import * as Yup from 'yup';

import { useAuth } from '../../hook/auth';

import api from '../../services/api';

import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { Alert, ShowAlertProps } from '../../components/Alert';

import LogoWhite from '../../assets/logo-white.png';

import {
    Container,
    Content,
    ContentLogo,
    Form,
    Logo,
    SubTitle,
} from './styles';

export function SignIn() {
    const { signIn } = useAuth();
    const sheetRefSignIp = useRef<BottomSheet>(null);
    const sheetRefSignUp = useRef<BottomSheet>(null);
    const [dataShowAlert, setDataShowAlert] = useState<ShowAlertProps>({ data: {} } as ShowAlertProps);
    const [email, setEmail] = useState('');
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');

    const snapPointsSignIn = useMemo(() => [1, 320], []);
    const snapPointsSignUp = useMemo(() => [1, 400], []);

    const handleSnapPressSignIn = useCallback((index) => {
        sheetRefSignIp.current.snapToIndex(index);
    }, []);

    const handleSnapPressSignUp = useCallback((index) => {
        sheetRefSignUp.current.snapToIndex(index);
    }, []);

    async function handleSignIn() {
        Keyboard.dismiss()
        try {

            const schema = Yup.object().shape({
                password: Yup.string()
                    .required('Digite a sua senha.'),
                userName: Yup.string()
                    .required('Digite o nome de usuário.')
            });

            const data = { userName, password };

            await schema.validate(data);

            await signIn({ username: userName, password });

        } catch (error) {
            if (error instanceof Yup.ValidationError) {
                setDataShowAlert({
                    data: {
                        title: "Opss!",
                        message: `${error.message}`,
                        type: "alert",
                        active: true,
                        confirmText: "OK",
                        handleConfirm: handleConfirmShowAlert
                    }
                })

            } else {
                setDataShowAlert({
                    data: {
                        title: "Opss!",
                        message: "Dados inválidos.",
                        type: "alert",
                        active: true,
                        confirmText: "OK",
                        handleConfirm: handleConfirmShowAlert
                    }
                })
            }
        }

    }
    

    async function handleSignUp() {
        Keyboard.dismiss()
        try {

            const schema = Yup.object().shape({
                password: Yup.string()
                    .min(8, 'A senha deve ser maior ou igual a 8 caracteres.')
                    .required('Senha é obrigatório.'),
                userName: Yup.string()
                    .required('Usuário é obrigatório.'),
                email: Yup.string()
                    .email('E-mail inválido.')
                    .required('E-mail é obrigatório.'),
            });

            const data = { email, userName, password };

            await schema.validate(data);

            const response = await api.post('/auth/signup', {
                email,
                username: userName,
                password
            });

            console.log(response)

            if (response.status === 201) {
                handleSnapPressSignUp(0)
                setDataShowAlert({
                    data: {
                        title: "Uhuuu!",
                        message: 'Cadastro realizado com sucesso.',
                        type: "alert",
                        active: true,
                        confirmText: "OK",
                        handleConfirm: handleConfirmShowAlert
                    }
                })
            }

        } catch (error) {
            console.log(error)
            if (error instanceof Yup.ValidationError) {
                setDataShowAlert({
                    data: {
                        title: "Opss!",
                        message: `${error.message}`,
                        type: "alert",
                        active: true,
                        confirmText: "OK",
                        handleConfirm: handleConfirmShowAlert
                    }
                })

            } else {
                setDataShowAlert({
                    data: {
                        title: "Opss!",
                        message: "Erro ao enviar os dados.",
                        type: "alert",
                        active: true,
                        confirmText: "OK",
                        handleConfirm: handleConfirmShowAlert
                    }
                })
            }
        }

    }

    function handleConfirmShowAlert() {
        setDataShowAlert({ data: {} } as ShowAlertProps);
    };

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <Container>
                    <Alert data={dataShowAlert.data} />
                    <ContentLogo>
                        <Logo
                            source={LogoWhite}
                        />
                        <SubTitle>Desafio: Adrian Abdesalan</SubTitle>
                    </ContentLogo>
                    <Content>
                        <Button
                            title="ENTRAR"
                            onPress={() => handleSnapPressSignIn(1)}
                        />
                        <Button
                            title="CRIAR CONTA"
                            onPress={() => handleSnapPressSignUp(1)}
                            type="secondary"
                        />
                    </Content>
                    <BottomSheet
                        ref={sheetRefSignIp}
                        snapPoints={snapPointsSignIn}
                    >
                        <Form>
                            <Input
                                iconName='user'
                                value={userName}
                                onChangeText={setUserName}
                                placeholder='Digite seu usuário'
                            />
                            <Input
                                iconName='lock'
                                placeholder='Digite sua senha'
                                value={password}
                                onChangeText={setPassword}
                                secureTextEntry
                            />
                            <Button
                                title="CONECTAR"
                                onPress={handleSignIn}
                            />
                            <Button
                                title="CANCELAR"
                                type="secondary"
                                onPress={() => handleSnapPressSignIn(0)}
                            />
                        </Form>
                    </BottomSheet>
                    <BottomSheet
                        ref={sheetRefSignUp}
                        snapPoints={snapPointsSignUp}
                    >
                        <Form>
                            <Input
                                iconName='mail'
                                value={email}
                                onChangeText={setEmail}
                                placeholder='Digite seu e-mail'
                            />
                            <Input
                                iconName='user'
                                value={userName}
                                onChangeText={setUserName}
                                placeholder='Digite seu usuário'
                            />
                            <Input
                                iconName='lock'
                                placeholder='Digite sua senha'
                                value={password}
                                onChangeText={setPassword}
                                secureTextEntry
                            />
                            <Button
                                title="CONFIRMAR"
                                onPress={handleSignUp}
                            />
                            <Button
                                title="CANCELAR"
                                type="secondary"
                                onPress={() => handleSnapPressSignUp(0)}
                            />
                        </Form>
                    </BottomSheet>
                </Container>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}