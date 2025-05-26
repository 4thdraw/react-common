import { useForm } from 'react-hook-form';
import supabase from './config/supabase'

// 변수정의 묶음, 설계필드제외하고 선언
type NaviFormInputs = {
  navinm: string; //네비게이션이름
  href: string;  // 링크
  icon: string;  // 아이콘
  visible: boolean; //출력여부 기본값 가진 필드
};
type NaviFormProps = {
  status: boolean;
  setStatus: (status: boolean) => void;
};

export default function NaviForm({ status, setStatus }: NaviFormProps) {


  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful }
  } = useForm<NaviFormInputs>({
    defaultValues: {
        //기본필드 가진 변수는 여기에다 설정하기
      visible: true
    }
  });

  //비동기함수 데이터를 서버에 전송하고 결과를 받아야하는 것
  //결과를 받기까지의 시간소비가 일어나는 함수 
  //async 키워드로 비동기함수임을 먼저 선언
  // 내부안에 await 혹은 promise 와 같은 전송, 대기, 결과 프로세스를 만들어줘야함
  
  const onSubmit = async (data: NaviFormInputs) => {
    //supabase.from('데이블이름').crud중 하나
    const { error } = await supabase.from('introduce_navi').insert([data]);
    if (error) {
      alert('저장 실패: ' + error.message);
    } else {
      alert('저장 성공!');
      reset(); // 폼 초기화
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-4 max-w-md mx-auto">
      <div>
        <label className="block font-semibold">메뉴명</label>
        <input
          {...register('navinm', { required: true })}
          className="border p-2 w-full rounded"
          placeholder="회사소개"
        />
        {errors.navinm && <p className="text-red-500 text-sm">메뉴명을 입력하세요.</p>}
      </div>

      <div>
        <label className="block font-semibold">링크</label>
        <input
          {...register('href', { required: true })}
          className="border p-2 w-full rounded"
          placeholder="/company"
        />
        {errors.href && <p className="text-red-500 text-sm">링크를 입력하세요.</p>}
      </div>

      <div>
        <label className="block font-semibold">아이콘 (이모지)</label>
        <input
          {...register('icon')}
          className="border p-2 w-full rounded"
          placeholder="🏢"
        />
      </div>

      <div className="flex items-center gap-2">
        <input type="checkbox" {...register('visible')} defaultChecked />
        <label>표시 여부</label>
      </div>

      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        disabled={isSubmitting}
      >
        {isSubmitting ? '저장 중...' : '저장하기'}
      </button>

      {isSubmitSuccessful && <p className="text-green-600 text-sm">성공적으로 저장되었습니다!</p>}
      <p>나는 자식컴포넌트 부모의 상태변수 status상태는? {status ? "true" : "false"} </p>
      <button onClick={()=>{
        setStatus(false); 
        // 나는 false만 값으로 처리
      }}>나는 자식컴포넌트 상태변수관리 트리거</button>
      
    </form>
  );
}
