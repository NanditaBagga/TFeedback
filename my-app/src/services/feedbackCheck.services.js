export const FeedbackCheck = (q1,q2,q3,q4,q5,comments) => {
    if(q1===""||q2===""||q3===""||q4===""||q5===""||comments==="")
    {
        return "Information not filled"
    }
    return true
} 