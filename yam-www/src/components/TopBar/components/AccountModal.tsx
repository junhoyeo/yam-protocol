import React, { useCallback } from 'react'
import styled from 'styled-components'

import { useWallet } from 'use-wallet'
import useLocalStorage from '../../../hooks/useLocalStorage'

import {
  yam as yamAddress,
  yamv2 as yamV2Address,
} from '../../../constants/tokenAddresses'
import useTokenBalance from '../../../hooks/useTokenBalance'
import { getDisplayBalance } from '../../../utils/formatBalance'

import Button from '../../Button'
import CardIcon from '../../CardIcon'
import IconButton from '../../IconButton'
import { AddIcon, RemoveIcon } from '../../icons'
import Label from '../../Label'
import Modal, { ModalProps } from '../../Modal'
import ModalActions from '../../ModalActions'
import ModalContent from '../../ModalContent'
import ModalTitle from '../../ModalTitle'
import Separator from '../../Separator'
import Spacer from '../../Spacer'
import Value from '../../Value'

const AccountModal: React.FC<ModalProps> = ({ onDismiss }) => {
  const [provider, setProvider] = useLocalStorage('provider', false)

  const { account, reset } = useWallet()

  const handleSignOutClick = useCallback(() => {
    reset()
    setProvider(false)
    onDismiss!()
    reset()
  }, [onDismiss, reset])

  const yamBalance = useTokenBalance(yamAddress)
  const yamV2Balance = useTokenBalance(yamV2Address)

  return (
    <Modal>
      <ModalTitle text="My Account" />
      <ModalContent>
        <Spacer />

        <div style={{ display: 'flex' }}>
          <StyledBalanceWrapper>
            <CardIcon>
              <span style={{ filter: 'saturate(0.5)' }}>🍠</span>
            </CardIcon>
            <StyledBalance>
              <StyledValue>{getDisplayBalance(yamBalance)}</StyledValue>
              <Label text="YAMV1 Balance" />
            </StyledBalance>
            <StyledBalanceActions>
              <IconButton>
                <RemoveIcon />
              </IconButton>
              <StyledSpacer />
              <IconButton>
                <AddIcon />
              </IconButton>
            </StyledBalanceActions>
          </StyledBalanceWrapper>

          <div style={{ alignSelf: 'stretch' }}>
            <Separator orientation="vertical" />
          </div>

          <StyledBalanceWrapper>
            <CardIcon>
              <span>🍠</span>
            </CardIcon>
            <StyledBalance>
              <Value value={getDisplayBalance(yamV2Balance, 24)} />
              <Label text="YAMV2 Balance" />
            </StyledBalance>
            <StyledBalanceActions>
              <IconButton>
                <RemoveIcon />
              </IconButton>
              <StyledSpacer />
              <IconButton>
                <AddIcon />
              </IconButton>
            </StyledBalanceActions>
          </StyledBalanceWrapper>
        </div>

        <StyledSpacer />
        <Button
          href={`https://etherscan.io/address/${account}`}
          text="View on Etherscan"
          variant="secondary"
        />
        <StyledSpacer />
        <Button
          onClick={handleSignOutClick}
          text="Sign out"
          variant="secondary"
        />
      </ModalContent>
      <ModalActions>
        <Button onClick={onDismiss} text="Cancel" />
      </ModalActions>
    </Modal>
  )
}

const StyledSpacer = styled.div`
  height: ${(props) => props.theme.spacing[4]}px;
  width: ${(props) => props.theme.spacing[4]}px;
`

const StyledValue = styled.div`
  color: ${(props) => props.theme.color.grey[600]};
  font-size: 36px;
  font-weight: 700;
`

const StyledBalance = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
`

const StyledBalanceWrapper = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
  flex-direction: column;
  margin-bottom: ${(props) => props.theme.spacing[4]}px;
`

const StyledBalanceActions = styled.div`
  align-items: center;
  display: flex;
  margin-top: ${(props) => props.theme.spacing[4]}px;
`

export default AccountModal;
