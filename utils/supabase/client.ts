"use client"
/**
 * 목적 : 브라우저 환경에서 Supabase 클라이언트를 생성하기 위한 함수
 * 주요기능 : 브라우저에서 사용할 supabase 클라이언트를 생성합니다. supabase의 url과
 * 익명 키를 환경변수에서 읽어옵니다.
 */
import { createBrowserClient } from "@supabase/ssr"

export const createBrowserSupabaseClient = () =>
  createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
