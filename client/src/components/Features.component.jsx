import React from 'react';

class Feature extends React.Component {


    render() {
        return (
            <section id="services" class="features-area">
            <div class="container">
                <div class="row justify-content-center">
                    <div class="col-lg-6 col-md-10">
                        <div class="section-title text-center pb-10">
                            <h3 class="title">Notre vision</h3>
                            <p class="text">
                                Connecter les professeurs avec leurs élèves n'importe quand et n'importe où.
                                Réinventer les systèmes de gestion d’apprentissage.
    
                            </p>
                        </div> 
                    </div>
                </div> 
    
                <div class="row justify-content-center">
                    <div class="col-lg-4 col-md-7 col-sm-9">
                        <div class="single-features mt-40">
                            <div class="features-title-icon d-flex justify-content-between">
                                <h4 class="features-title"><a href="#">Une classe Virtuelle </a></h4>
                                <div class="features-icon">
                                    <i class="lni lni-brush"></i>
                                    <img class="shape" src="assets/images/classroom.svg" alt="Shape" />
                                </div>
                            </div>
                            <div class="features-content">
                                <p class="text">
                                    Simple et rapide à créer et animer une classe avec notre solution de vidéo/chat
                                    streaming
                                    au temps réel.
                                </p>
                            </div>
                        </div> 
                    </div>
    
                    <div class="col-lg-4 col-md-7 col-sm-9">
                        <div class="single-features mt-40">
                            <div class="features-title-icon d-flex justify-content-between">
                                <h4 class="features-title"><a href="#">Interaction en live</a></h4>
                                <div class="features-icon">
                                    <i class="lni lni-layout"></i>
                                    <img class="shape" src="assets/images/interact.svg" alt="Shape" />
                                </div>
                            </div>
                            <div class="features-content">
                                <p class="text">
                                    Garantir une interaction fluide à distance, en gardant l’aspect humain.
                                </p>
                            </div>
                        </div> 
                    </div>
    
                    <div class="col-lg-4 col-md-7 col-sm-9">
                        <div class="single-features mt-40">
                            <div class="features-title-icon d-flex justify-content-between">
                                <h4 class="features-title"><a href="#">Dashboard</a></h4>
                                <div class="features-icon">
                                    <i style={{fontSize: '75px'}} class="lni lni-layout"></i>
                                    <img class="shape" src="assets/images/dash.svg" alt="Shape" />
                                </div>
                            </div>
                            <div class="features-content">
                                <p class="text">
                                    Un espace de gestion et paramétrage unique..
                                </p>
                            </div>
                        </div> 
                    </div>
    
                    <div class="col-lg-4 col-md-7 col-sm-9">
                        <div class="single-features mt-40">
                            <div class="features-title-icon d-flex justify-content-between">
                                <h4 class="features-title"><a href="#">Statistiques</a></h4>
                                <div class="features-icon">
                                    <i style={{fontSize: '71px'}} class="lni lni-layout"></i>
                                    <img class="shape" src="assets/images/stats.svg" alt="Shape"/>
                                </div>
                            </div>
                            <div class="features-content">
                                <p class="text">
                                    Statistiques et rapports.
                                </p>
                            </div>
                        </div> 
                    </div>
    
                    <div class="col-lg-4 col-md-7 col-sm-9">
                        <div class="single-features mt-40">
                            <div class="features-title-icon d-flex justify-content-between">
                                <h4 class="features-title"><a href="#">Chatbot</a></h4>
                                <div class="features-icon">
                                    <i style={{fontSize: '76px'}} class="lni lni-layout"></i>
                                    <img class="shape" src="assets/images/chatbot.svg" alt="Shape" />
                                </div>
                            </div>
                            <div class="features-content">
                                <p class="text">
                                    Automatiser les réponses les plus récurrentes..
                                </p>
                            </div>
                        </div>
                    </div>
    
    
                    <div class="col-lg-4 col-md-7 col-sm-9">
                        <div class="single-features mt-40">
                            <div class="features-title-icon d-flex justify-content-between">
                                <h4 class="features-title"><a href="#">Examen et surveillance
                                    </a></h4>
                                <div class="features-icon">
                                    <i class="lni lni-bolt"></i>
                                    <img class="shape" src="assets/images/exam.svg" alt="Shape" />
                                </div>
                            </div>
                            <div class="features-content">
                                <p class="text">
                                    Avec notre solution, il est possible de surveiller les élèves à distance pendant leur
                                    épreuves
                                </p>
                            </div>
                        </div> 
                    </div>
                </div> 
            </div>         </section>
        )
    }
}

export default Feature;