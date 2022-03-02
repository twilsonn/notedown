import { signIn } from 'next-auth/react'
import React from 'react'
import AppleLogo from '../../assets/AppleLogo'
import GitHub from '../../assets/GitHubLogo'
import GoogleLogo from '../../assets/GoogleLogo'
import Logo from '../../assets/Logo'

const AuthButton: React.FC<
  React.HTMLAttributes<HTMLDivElement> & {
    app: string
    logo: JSX.Element
  }
> = (props) => {
  const { app, logo } = props
  return (
    <div
      className="flex w-full hover:brightness-95 hover:dark:brightness-125 cursor-pointer"
      {...props}
    >
      <div className="p-5 bg-gray-300 dark:bg-stone-800 rounded-l-2xl">
        <div className="flex justify-center items-center h-full w-full">
          {logo}
        </div>
      </div>
      <div className="p-5 bg-gray-200 dark:bg-stone-700 dark:text-stone-300 rounded-r-2xl w-full">
        <div className="flex justify-start items-center h-full w-full">
          Sign in with {app}
        </div>
      </div>
    </div>
  )
}

const AuthModal: React.FC = () => {
  return (
    <div className="flex flex-col max-w-xs md:max-w-md  bg-gray-100 dark:bg-stone-900 shadow-2xl ring-1 ring-gray-200 dark:ring-stone-800 p-8 lg:max-w-lg m-auto rounded-2xl">
      <div className="text-center mb-4">
        <span className="w-full flex justify-center">
          <Logo className="h-16 w-16" />
        </span>
        <h3 className="dark:text-stone-300">Sign in to Notedown</h3>
      </div>

      <div className="space-y-4">
        <AuthButton
          onClick={() => signIn('github')}
          app="Github"
          logo={
            <GitHub className="w-6 h-6 md:w-8 md:h-8 fill-gray-600 dark:fill-stone-300" />
          }
        />

        <AuthButton
          onClick={() => signIn('apple')}
          app="Apple"
          logo={
            <AppleLogo className="w-6 h-6 md:w-8 md:h-8 fill-gray-600 dark:fill-stone-300" />
          }
        />

        <AuthButton
          onClick={() => signIn('google')}
          app="Google"
          logo={<GoogleLogo className="w-6 h-6 md:w-8 md:h-8" />}
        />
      </div>
    </div>
  )
}

export default AuthModal
