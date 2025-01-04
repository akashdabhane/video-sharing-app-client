import React from "react";
import Navbar from "../components/Navbar";

const TermsAndConditions = () => {
    return (
        <>
            <Navbar />
            <div className="bg-black text-white px-6 md:px-12 lg:px-24 py-12">
                {/* Terms and Conditions Header */}
                <div className="text-center border-b border-gray-700 pb-6">
                    <p className="text-purple-400 text-sm">Current as of 20 Jan 2022</p>
                    <h1 className="text-3xl font-bold mt-2">Terms and Conditions</h1>
                    <p className="mt-4 text-gray-300">
                        By accessing our website, you are agreeing to be bound by these terms of service, and agree
                        that you are responsible for compliance with any applicable local laws.
                    </p>
                </div>

                {/* Terms and Conditions Content */}
                <div className="mt-8 space-y-8">
                    <p className="text-gray-300">
                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptate facilis officia magni quidem labore
                        obcaecati sequi repellat sit iusto modi doloribus excepturi consectetur, numquam quis. Lorem ipsum dolor
                        sit amet, consectetur adipisicing elit. Nemo voluptatum provident eveniet neque impedit ipsa molestias,
                        animi reiciendis dolorum vitae cumque, itaque quae. Repudiandae obcaecati eaque perferendis fuga amet at?
                    </p>
                    <p className="text-gray-300">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad excepturi optio consequatur quas deleniti
                        sequi laboriosam rem, necessitatibus voluptates modi commodi exercitationem eos expedita repellendus?
                        Quisquam reiciendis illo deleniti, eligendi architecto velit veniam. Odit repudiandae rem, recusandae
                        placeat suscipit non incidunt similique optio facilis quae architecto minus iusto modi natus quod quidem
                        laboriosam unde error explicabo ullam! Enim unde iste, beatae, corrupti, velit animi perferendis nisi
                        maxime dolore qui aliquam.
                    </p>
                </div>

                {/* What Information Do We Collect */}
                <div className="mt-12">
                    <h2 className="text-2xl font-bold">What information do we collect?</h2>
                    <div className="mt-4 space-y-8">
                        <p className="text-gray-300">
                            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sit tenetur aperiam excepturi deleniti, tempora
                            quidem magni obcaecati quas. Quo perspiciatis, deserunt velit porro ipsum, quod sit ratione cupiditate
                            cumque aperiam dolorem adipisci architecto dolor id quisquam aliquid aspernatur. Repellat, consectetur?
                            At harum necessitatibus nisi rem ullam sapiente laborum eaque? Harum?
                        </p>
                        <p className="text-gray-300">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro at iusto laboriosam possimus in!
                            Repellendus ea accusantium omnis impedit incidunt facere fuga consectetur quidem sint dolorem
                            necessitatibus corporis itaque sed qui voluptates amet, sunt fugit? Deleniti explicabo et veniam alias
                            eligendi similique, molestiae ipsa vitae rerum non repudiandae accusamus error temporibus pariatur. Sit
                            totam, odit facilis adipisci ut vitae neque deserunt obcaecati. Laborum labore possimus ipsa quo placeat,
                            tempora voluptatibus commodi itaque quia cupiditate nihil at, porro deleniti totam quaerat!
                        </p>
                        <p className="text-gray-300">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum fuga asperiores voluptatibus quidem
                            dolores, quos officiis nostrum veritatis. A praesentium dicta temporibus vitae, excepturi sequi itaque?
                            Pariatur veniam praesentium error qui necessitatibus. Et autem dolorum consectetur officia, provident
                            quasi soluta?
                        </p>
                    </div>
                </div>

                {/* How Do We Use Your Information */}
                <div className="mt-12">
                    <h2 className="text-2xl font-bold">How do we use your information</h2>
                    <div className="mt-4 space-y-8">
                        <p className="text-gray-300">
                            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sit tenetur aperiam excepturi deleniti, tempora
                            quidem magni obcaecati quas. Quo perspiciatis, deserunt velit porro ipsum, quod sit ratione cupiditate
                            cumque aperiam dolorem adipisci architecto dolor id quisquam aliquid aspernatur. Repellat, consectetur?
                            At harum necessitatibus nisi rem ullam sapiente laborum eaque? Harum?
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default TermsAndConditions;
