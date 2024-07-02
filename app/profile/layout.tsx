import { H1 } from "@/components/reusable/titles"
import { verifyAuthSession } from "@/lib/auth"
import { C } from "@/types/react-child"
import Link from "next/link"
import { redirect } from "next/navigation"

type Props = { children: React.ReactNode }
export default async function ProfilePage({ children }: Props) {
  const { user } = await verifyAuthSession()
  if (!user) {
    redirect("/auth?m=singin")
  }
  return (
    <main className="flex flex-col items-center md:items-start md:flex-row ">
      <main>
        <nav className=" md:w-[250px] grid grid-cols-2 md:block  md:border-r">
          <NavSection name="Profile">
            <Link href="/profile/orders">
              <ListItem>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M4 7C2.89543 7 2 7.89543 2 9V11C2 11.8103 2.4819 12.5081 3.17474 12.8223L4.46169 17.9701C4.90685 19.7508 6.50679 21 8.34226 21H15.6576C17.4931 21 19.093 19.7508 19.5382 17.9701L20.8251 12.8224C21.518 12.5082 22 11.8104 22 11V9C22 7.89543 21.1046 7 20 7H4ZM18.7191 13H5.28071L6.40197 17.4851C6.62456 18.3754 7.42452 19 8.34226 19H15.6576C16.5753 19 17.3753 18.3754 17.5979 17.4851L18.7191 13ZM4 9H20V11H4V9Z"
                    className="fill-neutral-400 "
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M16.5529 3.10555C17.0468 2.85856 17.6475 3.05878 17.8945 3.55276L19.6181 7H17.3821L16.1056 4.44719C15.8587 3.95321 16.0589 3.35254 16.5529 3.10555ZM7.4471 3.10579C6.95312 2.8588 6.35244 3.05903 6.10546 3.55301L4.38184 7.00024H6.6179L7.89431 4.44743C8.1413 3.95345 7.94107 3.35278 7.4471 3.10579ZM11.0001 13V16C11.0001 16.5523 10.5524 17 10.0001 17C9.44782 17 9.0001 16.5523 9.0001 16V13H11.0001ZM15.0001 13V16C15.0001 16.5523 14.5524 17 14.0001 17C13.4478 17 13.0001 16.5523 13.0001 16V13H15.0001Z"
                    className="fill-neutral-600 "
                  />
                </svg>
                Your orders
              </ListItem>
            </Link>
            <ListItem>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M4 6C4 3.79086 5.79086 2 8 2H16C18.2091 2 20 3.79086 20 6V21C20 21.3361 19.8311 21.6498 19.5505 21.8348C19.2699 22.0199 18.915 22.0516 18.6061 21.9191L12 19.088L5.39392 21.9191C5.08496 22.0516 4.73014 22.0199 4.44951 21.8348C4.16888 21.6498 4 21.3361 4 21V6ZM8 4C6.89543 4 6 4.89543 6 6V19.4835L11.6061 17.0809C11.8576 16.973 12.1424 16.973 12.3939 17.0809L18 19.4835V6C18 4.89543 17.1046 4 16 4H8Z"
                  className="fill-neutral-400"
                />
                <path
                  d="M10 8C8.895 8 8 8.88291 8 9.97183C8 12.8201 12 15 12 15C12 15 16 12.8201 16 9.97183C16 8.88291 15.105 8 14 8C13.326 8 12.68 8.3806 12.312 8.88732C12.214 9.0226 12 9.31459 12 9.31459C12 9.31459 11.815 9.02533 11.719 8.88732C11.367 8.38428 10.721 8 10 8Z"
                  className="fill-neutral-600"
                />
              </svg>
              Favourites
            </ListItem>
          </NavSection>
          <hr className="hidden md:block" />
          <NavSection name="Profile settings">
            <ListItem>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16 7C15.448 7 15 7.4477 15 8C15 8.5523 15.448 9 16 9H21C21.552 9 22 8.5523 22 8C22 7.4477 21.552 7 21 7H16ZM15 11C14.448 11 14 11.4477 14 12C14 12.5523 14.448 13 15 13H21C21.552 13 22 12.5523 22 12C22 11.4477 21.552 11 21 11H15ZM18 15C17.448 15 17 15.4477 17 16C17 16.5523 17.448 17 18 17H21C21.552 17 22 16.5523 22 16C22 15.4477 21.552 15 21 15H18Z"
                  className="fill-neutral-600"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M4 7.5C4 5.015 6.015 3 8.5 3C10.985 3 13 5.015 13 7.5C13 9.985 10.985 12 8.5 12C6.015 12 4 9.985 4 7.5ZM11 7.5C11 6.119 9.881 5 8.5 5C7.119 5 6 6.119 6 7.5C6 8.881 7.119 10 8.5 10C9.881 10 11 8.881 11 7.5Z"
                  className="fill-neutral-400"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M2 18C2 15.956 3.22801 14.101 5.06201 13.344C5.31801 13.238 5.59199 13.26 5.84399 13.375C6.75999 13.792 7.625 14 8.5 14C9.378 14 10.24 13.803 11.125 13.406C11.381 13.292 11.68 13.295 11.938 13.406C13.765 14.194 15 16.004 15 18V20C15 20.552 14.552 21 14 21H3C2.448 21 2 20.552 2 20V18ZM8.5 16C7.531 16 6.39199 15.748 5.44699 15.39C4.65599 15.853 4 16.835 4 18V19H13V18C13 16.899 12.382 15.937 11.479 15.423C10.553 15.765 9.461 16 8.5 16Z"
                  className="fill-neutral-400"
                />
              </svg>
              Change credentials
            </ListItem>
            <Link href="/profile/change-password">
              <ListItem>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8 6C4.686 6 2 8.686 2 12C2 15.314 4.686 18 8 18C10.123 18 12.028 16.903 13.188 15.001L16.375 15L17.094 16.438C17.263 16.776 17.621 17 18 17H21C21.552 17 22 16.552 22 16V10C22 9.448 21.552 9 21 9L13.185 8.99201C12.102 7.15701 10.123 6 8 6ZM8 8C9.593 8 11.018 8.95601 11.656 10.406C11.816 10.769 12.166 11 12.562 11H20V15H18.625L17.906 13.562C17.737 13.224 17.379 13 17 13H12.562C12.166 13 11.816 13.231 11.656 13.594C11.018 15.044 9.593 16 8 16C5.791 16 4 14.209 4 12C4 9.791 5.791 8 8 8Z"
                    className="fill-neutral-400"
                  />
                  <circle cx="8" cy="12" r="1" className="fill-neutral-600" />
                </svg>
                Change password
              </ListItem>
            </Link>

            <ListItem>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.9978 2C7.5795 2 3.9978 5.582 3.9978 9.99999C3.9978 13.467 6.2456 17.412 9.279 20.688C9.377 20.793 9.4563 20.875 9.5603 20.969C10.4183 21.738 11.3084 22.01 11.9978 22C12.0065 22 12.022 22 12.029 22C12.7465 22 13.7583 21.677 14.7166 20.719C17.6266 17.809 19.9978 13.518 19.9978 9.99999C19.9978 5.582 16.4161 2 11.9978 2ZM11.9978 4C15.3115 4 17.9978 6.686 17.9978 9.99999C17.9978 12.886 15.8501 16.71 13.279 19.281C12.7373 19.823 12.2528 20 11.9978 20C11.9766 20 11.9615 20 11.9666 20C11.7392 20.003 11.3423 19.893 10.904 19.5C10.846 19.448 10.7726 19.373 10.7166 19.312C7.9958 16.375 5.9978 12.833 5.9978 9.99999C5.9978 6.686 8.6841 4 11.9978 4Z"
                  className="fill-neutral-400"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M12 9C11.4477 9 11 9.44772 11 10C11 10.5523 11.4477 11 12 11C12.5523 11 13 10.5523 13 10C13 9.44772 12.5523 9 12 9ZM9 10C9 8.34315 10.3431 7 12 7C13.6569 7 15 8.34315 15 10C15 11.6569 13.6569 13 12 13C10.3431 13 9 11.6569 9 10Z"
                  className="fill-neutral-600"
                />
              </svg>
              Change shipping adress
            </ListItem>
            <ListItem>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5 7.99731C2.791 7.99731 1 9.78821 1 11.9973V15.9973C1 18.2063 2.791 19.9973 5 19.9973H19C21.209 19.9973 23 18.2063 23 15.9973V11.9973C23 9.78821 21.209 7.99731 19 7.99731H5ZM5.812 9.99731H18.188C18.553 11.3865 19.611 12.4444 21 12.8098V15.1853C19.611 15.5503 18.553 16.6083 18.188 17.9973H5.812C5.447 16.6083 4.389 15.5503 3 15.1853V12.8098C4.389 12.4444 5.447 11.3865 5.812 9.99731Z"
                  className="fill-neutral-400"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M4 4C3.44772 4 3 4.44772 3 5C3 5.55228 3.44772 6 4 6H20C20.5523 6 21 5.55228 21 5C21 4.44772 20.5523 4 20 4H4ZM11 14C11 13.4477 11.4477 13 12 13C12.5523 13 13 13.4477 13 14C13 14.5523 12.5523 15 12 15C11.4477 15 11 14.5523 11 14ZM12 11C10.3431 11 9 12.3431 9 14C9 15.6569 10.3431 17 12 17C13.6569 17 15 15.6569 15 14C15 12.3431 13.6569 11 12 11Z"
                  className="fill-neutral-600"
                />
              </svg>
              Change payment method
            </ListItem>
          </NavSection>
        </nav>
      </main>
      <main className="w-full h-24">{children}</main>
    </main>
  )
}

type NavSectionType = {
  children: React.ReactNode
  name: string
}

function NavSection({ children, name }: NavSectionType) {
  return (
    <div className="py-2">
      <span className="uppercase tracking-wide  cursor-default">{name}</span>
      <ul className=" mt-2">{children}</ul>
    </div>
  )
}

function ListItem({ children }: C) {
  return (
    <li className="hover:bg-fill text-text-weak hover:text-text-strong cursor-pointer flex gap-3 rounded-lg p-2 group">
      {children}
    </li>
  )
}
