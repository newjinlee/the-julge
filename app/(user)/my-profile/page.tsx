import Link from 'next/link';
import ProfileCard from './ProfileCard';
import ProfileRegister from './profileRegister';
import JobApplication from './JobApplication';

export default function Page() {
  return (
    <>
      <ProfileRegister></ProfileRegister>
      <ProfileCard
        name="임상훈"
        phoneNumber="010-9802-2131"
        preferAddress="서울시 성동구"
        selfIntroduction="열심히 일하겠습니다."></ProfileCard>
      <JobApplication></JobApplication>
    </>
  );
}
