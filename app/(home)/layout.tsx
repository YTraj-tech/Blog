// import React, { ReactNode } from 'react'
// import { currentUser } from '@clerk/nextjs/server'
// import {prisma} from "@/lib/prisma"

// const Layout = async ({ children }: { children: ReactNode }) => {
//   const user = await currentUser()
//   console.log("✅ Clerk user:", user) 

//   if (!user) {
//     console.warn("No user found from Clerk.")
//     return null
//   }

//   try {
//     const existingUser = await prisma.user.findUnique({
//       where: { clerkId: user.id },
//     })

//     if (existingUser) {
//       console.log("✅ User already exists in DB:", existingUser.email)
//     } else {
//       const createdUser = await prisma.user.create({
//         data: {
//           clerkId: user.id,
//           name: user.fullName ?? "Unknown",
//           email: user.emailAddresses[0].emailAddress,
//           imageUrl: user.imageUrl ?? "",
//         },
//       })
//       console.log(" User created in Neon DB:", createdUser)
//     }
//   } catch (error) {
//     console.error("❌ Error creating user in Neon DB:", error)
//   }

//   return <div>{children}</div>
// }

// export default Layout







import { Toaster } from 'sonner';
import React, { ReactNode } from 'react';
import { currentUser } from '@clerk/nextjs/server';
import { prisma } from '@/lib/prisma';

const Layout = async ({ children }: { children: ReactNode }) => {
  const user = await currentUser();
  console.log('✅ Clerk user:', user);

  // Do DB creation only if signed in
  if (user) {
    try {
      const existingUser = await prisma.user.findUnique({
        where: { clerkId: user.id },
      });

      if (existingUser) {
        console.log('✅ User already exists in DB:', existingUser.email);
      } else {
        const createdUser = await prisma.user.create({
          data: {
            clerkId: user.id,
            name: user.fullName ?? 'Unknown',
            email: user.emailAddresses[0]?.emailAddress ?? 'no-email@example.com',
            imageUrl: user.imageUrl ?? '',
          },
        });
        console.log('✅ User created in DB:', createdUser);
      }
    } catch (error) {
      console.error('❌ Error creating user in DB:', error);
    }
  } else {
    console.warn('No user found from Clerk.');
  }

  return (
    <html lang="en">
      <body>
        <div>{children}</div>
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
};

export default Layout;