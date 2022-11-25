export const FeedbackCheck = (q1,q2,q3,q4,q5) => {
    if(q1===""||q2===""||q3===""||q4===""||q5==="")
    {
        return "Information not filled"
    }
    return true
} 