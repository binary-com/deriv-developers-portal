import { HomepageFooter } from "../HomepageFooter/HomepageFooter"
import { HeroHeader } from "../HeroHeader/HeroHeader";
import { ClientLibraries } from "../ClientLibraries/ClientLibraries"
import { HomepageSlider } from "../HomepageSlider/HomepageSlider";
import { Benefits } from "../Benefits/Benefits";
import { WaysToEarn } from "../WaysToEarn/WaysToEarn"
import { GetStarted } from "../GetStarted/GetStarted"
import { DerivApiFeatures } from "../DerivApiFeatures/DerivApiFeatures"
import { RenderOfficialDomainContents } from "../../utility/RenderOfficialDomainContents/RenderOfficialDomainContents";

export default function HomePage() {
  return (
    <div className="main-content">
      <RenderOfficialDomainContents Component={HeroHeader} />
      <ClientLibraries />
      <RenderOfficialDomainContents Component={Benefits} />
      <div className="main-page-row gray ways-row">
        <RenderOfficialDomainContents Component={WaysToEarn} />
        <RenderOfficialDomainContents Component={GetStarted} />
        <RenderOfficialDomainContents Component={DerivApiFeatures} />
        <div className="main-page-row white">
          <h2 className="clients-opinion">See what our clients say</h2>
          <div className="column-container">
            <RenderOfficialDomainContents Component={HomepageSlider} />
          </div>
        </div>
      </div>
      <RenderOfficialDomainContents Component={HomepageFooter} />
    </div>
  );
}
