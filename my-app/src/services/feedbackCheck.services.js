export const FeedbackCheck = (q1,q2,q3,q4,q5,comment) => {
    if(q1===""||q2===""||q3===""||q4===""||q5===""||comment==="")
    {
        return "Information not filled"
    }
    return true
} 