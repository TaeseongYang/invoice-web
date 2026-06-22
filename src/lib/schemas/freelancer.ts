import { z } from 'zod'

export const signupSchema = z
  .object({
    name: z
      .string()
      .min(1, '이름을 입력해주세요.')
      .min(2, '이름은 최소 2자 이상이어야 합니다.'),
    email: z
      .string()
      .min(1, '이메일을 입력해주세요.')
      .email('올바른 이메일 형식이 아닙니다.'),
    companyName: z.string().optional(),
    password: z
      .string()
      .min(1, '비밀번호를 입력해주세요.')
      .min(8, '비밀번호는 최소 8자 이상이어야 합니다.'),
    confirmPassword: z.string().min(1, '비밀번호 확인을 입력해주세요.'),
    terms: z.boolean().refine(val => val === true, '이용약관에 동의해주세요.'),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: '비밀번호가 일치하지 않습니다.',
    path: ['confirmPassword'],
  })

export type SignupInput = z.infer<typeof signupSchema>

export const updateFreelancerSchema = z.object({
  name: z
    .string()
    .min(1, '이름을 입력해주세요.')
    .min(2, '이름은 최소 2자 이상이어야 합니다.'),
  companyName: z.string().optional(),
})

export type UpdateFreelancerInput = z.infer<typeof updateFreelancerSchema>

// 환경변수 패스워드 단독 인증 방식 — email 필드 제거
export const loginSchema = z.object({
  password: z.string().min(1, '비밀번호를 입력해주세요.'),
})

export type LoginInput = z.infer<typeof loginSchema>
