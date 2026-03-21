import Link from 'next/link';
import { getUserSession } from '../_lib/session';
import LogoutButton from './LogoutButton';

const Navbar = async () => {
    const session = await getUserSession();
    return (
        <nav className='bg-white shadow-lg p-4 flex items-center justify-between lg:px-10 px-2'>
            <Link href='/' className='text-blue-600 text-xl font-bold'>Contact Manager</Link>
            <div className="flex gap-4 items-center">
                {session ? (
                    <>
                    <Link href='/contact' className="hover:text-blue-600">Contacts</Link>
                    <LogoutButton />
                    </>
                ) : (
                    <>
                    <Link href='/login' className='hover:text-blue-600'>Login</Link>
                    <Link href='/register' className='hover:text-blue-600'>Register</Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
