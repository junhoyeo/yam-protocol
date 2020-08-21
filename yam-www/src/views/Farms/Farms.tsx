import React from 'react'
import {
  Route,
  Switch,
  useRouteMatch,
} from 'react-router-dom'

import useModal from '../../hooks/useModal'
import { useWallet } from 'use-wallet'

import Button from '../../components/Button'
import FarmCards from './components/FarmCards'
import PageHeader from '../../components/PageHeader'
import WalletProviderModal from '../../components/TopBar/components/WalletProviderModal'

import Farm from '../Farm'
import farmer from '../../assets/img/farmer.png'

const Farms: React.FC = () => {
  const { path } = useRouteMatch()
  const { account } = useWallet()
  const [onPresentWalletProviderModal] = useModal(<WalletProviderModal />)

  return (
    <Switch>
      {!!account ? (
        <>
          <Route exact path={path}>
            <PageHeader
              icon={<img src={farmer} height="96" />}
              subtitle="Earn YAM tokens by providing liquidity."
              title="Select a farm."
            />
            <FarmCards />
          </Route>
          <Route path={`${path}/:farmId`}>
            <Farm />
          </Route>
        </>
      ) : (
        <div style={{
          alignItems: 'center',
          display: 'flex',
          flex: 1,
          justifyContent: 'center',
        }}>
          <Button
            onClick={onPresentWalletProviderModal}
            text="Unlock Wallet"
          />
        </div>
      )}
    </Switch>
  )
}


export default Farms