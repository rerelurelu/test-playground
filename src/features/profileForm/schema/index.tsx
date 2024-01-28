import * as yup from 'yup';

export const schema = yup.object().shape({
  name: yup.string().required('名前は必須です'),
  email: yup.string().email('メールアドレスが不正です').required('メールアドレスは必須です'),
  age: yup
    .number()
    .transform((value) => (isNaN(value) ? undefined : value))
    .min(0, '年齢は０以上で入力してください')
    .required('年齢は必須です'),
  introduction: yup.string().required('自己紹介は必須です'),
  job: yup.string().required('職業は必須です'),
});
