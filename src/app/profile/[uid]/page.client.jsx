'use client'
import React from "react";
import { Button, Tabs, TabItem } from "flowbite-react";
import { MessageSquare } from "lucide-react";
import PostCard from "@/components/post-card";
import Sidebar from "@/components/sidebar";
import AboutSection from "@/components/about-section";
import PortfolioSection from "@/components/portfolio-section";
import ReviewsSection from "@/components/reviews-section";
import { PLATFORM_COMMISSION } from "@/schema/globals";

function PageClient({ defaultBroker, model, posts, reviews }) {
  const [tab, setTab] = React.useState(posts.length > 0 ? "posts" : "portfolio");
  const commissions = {...defaultBroker.commissions, ...PLATFORM_COMMISSION};

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="">
        <Button
          color="light"
          onClick={() => window.history.back()}
          className="mb-4 text-pink-600 hover:text-pink-700"
        >
          ← 返回
        </Button>
      </div>
      <div className="">
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 max-h-100vh">
          <Sidebar 
            model={model} 
            reviews={reviews} 
            isLoggedIn={true} 
            contactInfo={defaultBroker?.brokerInfo?.contactInfo}
            commissions={commissions} 
            />
          <div className="lg:col-span-3 overflow-y-auto">
            <AboutSection model={model} />
            <Tabs
              aria-label="Profile tabs"
              variant="underline"
              style={{ marginBottom: "1rem" }}
              onActiveTabChange={(idx) => setTab(["posts", "portfolio", "reviews"][idx])}
            >
              <TabItem active={tab === "posts"} title="動態貼文">
                {posts.length > 0 ? (
                  <div>
                    {posts.map((post) => (
                      <PostCard key={post.id} post={post} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 text-gray-500">
                    <MessageSquare
                      size={48}
                      className="mx-auto mb-4 text-gray-300"
                    />
                    <p>目前還沒有動態貼文</p>
                    <p className="text-sm">期待更多精彩內容！</p>
                  </div>
                )}
              </TabItem>
              <TabItem active={tab === "portfolio"} title="作品集">
                <PortfolioSection model={model} />
              </TabItem>
              <TabItem active={tab === "reviews"} title="客戶評價">
                <ReviewsSection 
                  serviceAccountId={model.id} 
                  reviews={reviews} 
                  />
              </TabItem>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PageClient;