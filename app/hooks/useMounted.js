import { useMount, useBoolean } from "ahooks"

const useMounted = () =>
{
  const [isMounted, {setTrue}] = useBoolean(false);
  
  useMount(() =>
  {
    setTrue();
  })

  return {isMounted};
}

export default useMounted;