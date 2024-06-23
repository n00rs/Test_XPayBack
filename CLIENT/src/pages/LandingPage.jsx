import React from "react";
import Header from "../components/Header/Header";
import Banner from "../components/Banner";
import LandingContent from "../components/LandingContent";

const LandingPage = () => {
  return (
    <div>
      <Header />
      <Banner imgSrc={"/images/banner.jpg"} />

      <LandingContent
        title="How To Take Amazing Photos On Your Motorcycle Tour!"
        content={`Taking photos on your motorcycle tour used to be simple. But trends and technology have moved on a lot over the last year or two.

                  For years, vloggers had us believe the only way to capture stunning footage of your motorcycle tour was to strap an action camera to your helmet.
                  
                  And for a while, it was the only way.
                  
                  But over the last year or two, things have moved on.
                  
                  As technology advanced, gadgets and gizmos trickle their way down to the public, and we too can take advance of it.
                  
                  After the action camera boom of the last decade, we started to see shifts in what people wanted to see.
                  
                  Traditional action camera footage became less prevalent on social media as 360 cameras began to flood the market.
                  
                  The popularity of drones came, went, and then came back again.
                  
                  So as we go into 2022, what gear do you need to take amazing photos of your motorcycle tour?
                  
                  Well, the simplicity of the answer might just surprise you.
      `}
        imgSrc="/images/landingContent.jpg"
      />

      <LandingContent
        title="Virtual Incubation Program for Women Entrepreneurs"
        content={`As with showing too much footage of your bike, don’t show us too much of the road.
                  Yes, a GoPro attached to your chin will give us that rider-focused view of exactly what you were seeing at the time. And that’s great!
                  But we don’t need to see 1,000km’s of you hurtling through France on toll roads.
                  As mentioned above, it needs to have context. Otherwise, your viewer will be wondering why they’ve been looking at a road for the last half an hour.`}
        imgSrc="/images/landingContent2.jpg"
      />
    </div>
  );
};

export default LandingPage;
