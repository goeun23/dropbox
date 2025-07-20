"use server"
/*
* 서버 환경에서 supabase 클리ㅏ이언트를 생성하기 위한 함수들 
주요기능 : 
*/
import { createServerClient, type CookieOptions } from "@supabase/ssr"
import { cookies } from "next/headers"
import { Database } from "types_db"

export const createServerSupabaseClient = async (
  cookieStore: ReturnType<typeof cookies> = cookies(),
  admin: boolean = false // admin API는 사용할 수 없다.
) => {
  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    admin
      ? process.env.NEXT_SUPABASE_SERVICE_ROLE!
      : process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value, ...options })
          } catch (error) {
            // The `set` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
        remove(name: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value: "", ...options })
          } catch (error) {
            // The `delete` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    }
  )
}

export const createServerSupabaseAdminClient = async (
  cookieStore: ReturnType<typeof cookies> = cookies()
) => {
  return createServerSupabaseClient(cookieStore, true) // admin true, 전체 유저데이터를 가져오거나 접근해서 사용할 수 있음
}
