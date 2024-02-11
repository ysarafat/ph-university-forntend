import { useGetAllSemestersQuery } from "../../../redux/features/academicSemester/academicSemesterApi";

const AcademicSemester = () => {
  const {
    data: academicSemester,
    isLoading,
    error,
  } = useGetAllSemestersQuery(undefined);
  console.log(academicSemester);
  return <div>Academic Semester</div>;
};

export default AcademicSemester;
