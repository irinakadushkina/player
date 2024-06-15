'use client'

import styled from "styled-components";
import { Avatar, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { User } from "@/app/types/user";
import { StyledTypography } from "@/app/common-components/styled-typography";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const UserContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    margin: 12px 0 0;
`;

const SignInPage = () => {
    const [lastUser, setLastUser] = useState<User | null>(null);

    const getUser = async () => {
        const res = await fetch('/api/user', { method: 'GET' });
        const { data } = await res.json();

        setLastUser(data);
    }

    useEffect(() => {
        getUser();
    }, []);

    return (
        <Container>
            { !!lastUser && (
                <UserContainer>
                    <Avatar src={lastUser?.avatar} />
                    <StyledTypography color='primary' margin={1}>
                        {lastUser?.first_name} {lastUser?.last_name}
                    </StyledTypography>
                </UserContainer>
            )}
            <TextField label="Login" variant="outlined" margin='normal' />
            <TextField label="Password" variant="outlined" margin='normal' />
        </Container>
    )
}

export default SignInPage;
