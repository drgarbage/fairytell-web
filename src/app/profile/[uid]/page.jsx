import React from "react";
import getServiceAccount from "@/client-services/service-accounts/serviceAccount";
import PageClient from "./page.client";

const mockPosts = {
  '1': [
    {
      id: 'p1',
      modelId: '1',
      images: [
        'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=600&h=600&fit=crop',
        'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=600&h=600&fit=crop'
      ],
      caption: '今天的時尚攝影拍攝圓滿結束！感謝攝影師團隊的專業指導，這次的主題是都會優雅風格，希望大家喜歡這組作品 ✨ #時尚攝影 #都會風格',
      date: '2024年1月20日',
      likes: 287,
      comments: 24,
      location: '台北市信義區',
      tags: ['時尚攝影', '都會風格', '專業拍攝']
    },
    {
      id: 'p2',
      modelId: '1',
      images: [
        'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=600&h=600&fit=crop'
      ],
      caption: '週末的小確幸 ☕️ 在咖啡廳度過悠閒的午後，為下週的拍攝做準備。保持好心情是最重要的！',
      date: '2024年1月18日',
      likes: 156,
      comments: 18,
      location: '台北市大安區',
      tags: ['生活日常', '咖啡時光']
    },
    {
      id: 'p3',
      modelId: '1',
      images: [
        'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&h=600&fit=crop',
        'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=600&h=600&fit=crop',
        'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=600&h=600&fit=crop'
      ],
      caption: '商業廣告拍攝花絮！這次為知名服飾品牌拍攝春季新品，每一套服裝都有不同的故事。感謝整個團隊的努力！🌸',
      date: '2024年1月15日',
      likes: 432,
      comments: 37,
      location: '台北攝影棚',
      tags: ['商業廣告', '服飾拍攝', '春季新品']
    }
  ],
  '2': [
    {
      id: 'p4',
      modelId: '2',
      images: [
        'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&h=600&fit=crop'
      ],
      caption: '最新的Cosplay作品完成！這次挑戰了動漫角色，從服裝到妝容都親自參與設計。創意無限！🎭',
      date: '2024年1月19日',
      likes: 198,
      comments: 31,
      tags: ['Cosplay', '動漫角色', '創意攝影']
    },
    {
      id: 'p5',
      modelId: '2',
      images: [
        'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=600&h=600&fit=crop',
        'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=600&fit=crop'
      ],
      caption: '戶外創意拍攝日！今天在公園裡嘗試了很多有趣的構圖和光線效果。自然光真的是最好的攝影師 📸',
      date: '2024年1月16日',
      likes: 245,
      comments: 28,
      location: '新竹市立公園',
      tags: ['戶外拍攝', '自然光', '創意攝影']
    }
  ],
  '3': [
    {
      id: 'p6',
      modelId: '3',
      images: [
        'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=600&h=600&fit=crop'
      ],
      caption: '商品攝影的精髓在於細節！今天為珠寶品牌拍攝，每個角度都要完美呈現產品的美感 💎',
      date: '2024年1月17日',
      likes: 178,
      comments: 15,
      tags: ['商品攝影', '珠寶拍攝', '細節美學']
    }
  ]
};

// 模擬評價數據
const mockReviews = {
  '1': [
    {
      id: 'r1',
      userId: 'u1',
      userName: '攝影師 David',
      userAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
      rating: 5,
      comment: '艾莉亞非常專業，拍攝過程中配合度很高，成果超出預期！推薦給所有攝影師朋友。',
      date: '2024年1月15日',
      projectType: '時尚攝影'
    },
    {
      id: 'r2',
      userId: 'u2',
      userName: '攝影師 Sarah',
      userAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face',
      rating: 5,
      comment: '合作愉快，很有鏡頭感，表情管理到位。會再次合作的模特兒！',
      date: '2024年1月8日',
      projectType: '商業廣告'
    },
    {
      id: 'r3',
      userId: 'u3',
      userName: '攝影師 Mark',
      userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
      rating: 4,
      comment: '整體表現不錯，準時到場，服裝準備充分。唯一小建議是希望能更主動一些。',
      date: '2023年12月28日',
      projectType: '婚紗攝影'
    },
    {
      id: 'r4',
      userId: 'u4',
      userName: '攝影師 Lisa',
      userAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face',
      rating: 5,
      comment: '超級棒的合作經驗！艾莉亞很懂得配合不同的拍攝風格，專業度滿分。',
      date: '2023年12月20日',
      projectType: '封面攝影'
    }
  ],
  '2': [
    {
      id: 'r5',
      userId: 'u5',
      userName: '攝影師 Alex',
      userAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face',
      rating: 5,
      comment: '安娜的創意思維很棒，能夠提出很多有趣的拍攝想法，合作非常愉快！',
      date: '2024年1月12日',
      projectType: 'Cosplay'
    },
    {
      id: 'r6',
      userId: 'u6',
      userName: '攝影師 Jenny',
      userAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop&crop=face',
      rating: 4,
      comment: '拍攝過程很順利，安娜很配合導演的要求，成品質量很好。',
      date: '2024年1月5日',
      projectType: '短片拍攝'
    }
  ],
  '3': [
    {
      id: 'r7',
      userId: 'u7',
      userName: '攝影師 Tom',
      userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
      rating: 4,
      comment: '莎拉在商業拍攝方面很有經驗，能夠快速理解品牌需求。',
      date: '2024年1月10日',
      projectType: '商品攝影'
    }
  ]
};

async function ProfilePage({ params: { uid } }) {
  const { 
    createdAt, 
    agentInfo,
    merchantInfo,
    placeInfo,
    publishExpiry,
    ...serviceAccount
  } = await getServiceAccount(uid);  
  return (
    <PageClient model={serviceAccount} posts={mockPosts[1]} reviews={mockReviews[1]} />
  );
}

export default ProfilePage;