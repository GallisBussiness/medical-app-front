import { useIsFetching } from 'react-query'
import { ProgressBar } from 'primereact/progressbar';
 
 function GlobalLoadingIndicator() {
   const isFetching = useIsFetching()
 
   return isFetching ? (
     <>
     <ProgressBar mode="indeterminate" style={{ height: '6px' }} />
     </>
   ) : null
 }

 export default GlobalLoadingIndicator;